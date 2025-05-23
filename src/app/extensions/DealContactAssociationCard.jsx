import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Button,
  Alert,
  LoadingSpinner,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Input,
  EmptyState,
} from '@hubspot/ui-extensions';
import { hubspot } from '@hubspot/ui-extensions';

// コンポーネントのインポート
import ContactList from '../../components/ContactList';
import SearchBox from '../../components/SearchBox';
import AssociationManager from '../../components/AssociationManager';

// フックのインポート
import useContactData from '../../hooks/useContactData';
import useAssociation from '../../hooks/useAssociation';
import useErrorHandler from '../../hooks/useErrorHandler';

// ユーティリティのインポート
import { formatContactName, formatCompanyName } from '../../utils/formatting';
import { validateDealId } from '../../utils/validation';

// 定数のインポート
import { UI_MESSAGES, ERROR_CODES } from '../../constants/messages';

const DealContactAssociationCard = () => {
  // ステート管理
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState([]);
  
  // コンテキストから取引IDを取得
  const { context } = hubspot();
  const dealId = context.crm?.objectId;
  
  // カスタムフック
  const {
    availableContacts,
    associatedContacts,
    loading: contactDataLoading,
    error: contactDataError,
    refreshData
  } = useContactData(dealId);
  
  const {
    associateContact,
    removeAssociation,
    loading: associationLoading,
    error: associationError
  } = useAssociation(dealId);
  
  const { error, handleError, clearError } = useErrorHandler();
  
  // 初期化処理
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (!validateDealId(dealId)) {
          throw new Error(ERROR_CODES.INVALID_DEAL_ID);
        }
        
        setIsLoading(false);
      } catch (err) {
        handleError(err);
        setIsLoading(false);
      }
    };
    
    initializeComponent();
  }, [dealId, handleError]);
  
  // フィルタリングされたコンタクト一覧
  const filteredContacts = availableContacts.filter(contact => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const fullName = formatContactName(contact).toLowerCase();
    const email = (contact.email || '').toLowerCase();
    
    return fullName.includes(searchLower) || email.includes(searchLower);
  });
  
  // コンタクト関連付け処理
  const handleAssociateContact = async (contactId) => {
    try {
      clearError();
      await associateContact(contactId);
      await refreshData();
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    } catch (err) {
      handleError(err);
    }
  };
  
  // 関連付け削除処理
  const handleRemoveAssociation = async (contactId) => {
    try {
      clearError();
      await removeAssociation(contactId);
      await refreshData();
    } catch (err) {
      handleError(err);
    }
  };
  
  // コンタクト選択処理
  const handleContactSelect = (contactId) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };
  
  // バッチ関連付け処理
  const handleBatchAssociate = async () => {
    try {
      clearError();
      
      // 選択されたコンタクトを順次関連付け
      for (const contactId of selectedContacts) {
        await associateContact(contactId);
      }
      
      await refreshData();
      setSelectedContacts([]);
    } catch (err) {
      handleError(err);
    }
  };
  
  // ローディング状態の表示
  if (isLoading || contactDataLoading) {
    return (
      <Flex direction="column" align="center" gap="medium">
        <LoadingSpinner size="medium" />
        <Text>{UI_MESSAGES.LOADING}</Text>
      </Flex>
    );
  }
  
  // エラー状態の表示
  if (error || contactDataError || associationError) {
    const errorMessage = error || contactDataError || associationError;
    return (
      <Alert title="エラーが発生しました" variant="error">
        <Text>{errorMessage}</Text>
        <Button onClick={() => {
          clearError();
          refreshData();
        }}>
          再試行
        </Button>
      </Alert>
    );
  }
  
  return (
    <Flex direction="column" gap="medium">
      {/* ヘッダー */}
      <Flex direction="row" justify="between" align="center">
        <Text variant="microcopy" format={{ fontWeight: 'bold' }}>
          コンタクト関連付け管理
        </Text>
        <Button 
          size="small" 
          onClick={refreshData}
          disabled={associationLoading}
        >
          更新
        </Button>
      </Flex>
      
      {/* 既存の関連付け一覧 */}
      {associatedContacts.length > 0 && (
        <Flex direction="column" gap="small">
          <Text variant="microcopy" format={{ fontWeight: 'bold' }}>
            関連付け済みコンタクト ({associatedContacts.length})
          </Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>名前</TableHeader>
                <TableHeader>メール</TableHeader>
                <TableHeader>会社</TableHeader>
                <TableHeader>操作</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {associatedContacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <Text>{formatContactName(contact)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{contact.email || '未設定'}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCompanyName(contact.company) || '未設定'}</Text>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="extra-small"
                      onClick={() => handleRemoveAssociation(contact.id)}
                      disabled={associationLoading}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Flex>
      )}
      
      {/* 検索ボックス */}
      <SearchBox
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="コンタクト名またはメールアドレスで検索"
      />
      
      {/* バッチ操作 */}
      {selectedContacts.length > 0 && (
        <Flex direction="row" gap="small" align="center">
          <Text variant="microcopy">
            {selectedContacts.length}件のコンタクトが選択されています
          </Text>
          <Button
            variant="primary"
            size="small"
            onClick={handleBatchAssociate}
            disabled={associationLoading}
          >
            選択したコンタクトを関連付け
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setSelectedContacts([])}
          >
            選択解除
          </Button>
        </Flex>
      )}
      
      {/* 関連付け可能コンタクト一覧 */}
      <Flex direction="column" gap="small">
        <Text variant="microcopy" format={{ fontWeight: 'bold' }}>
          関連付け可能コンタクト ({filteredContacts.length})
        </Text>
        
        {filteredContacts.length === 0 ? (
          <EmptyState>
            <Text>関連付け可能なコンタクトがありません</Text>
            {searchQuery && (
              <Text variant="microcopy">
                検索条件: "{searchQuery}"
              </Text>
            )}
          </EmptyState>
        ) : (
          <ContactList
            contacts={filteredContacts}
            selectedContacts={selectedContacts}
            onContactSelect={handleContactSelect}
            onAssociate={handleAssociateContact}
            loading={associationLoading}
          />
        )}
      </Flex>
      
      {/* 関連付け管理 */}
      <AssociationManager
        dealId={dealId}
        onAssociationChange={refreshData}
      />
    </Flex>
  );
};

export default DealContactAssociationCard;