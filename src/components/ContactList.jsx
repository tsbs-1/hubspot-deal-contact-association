import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Text,
  Checkbox,
  Flex
} from '@hubspot/ui-extensions';

import { formatContactName, formatCompanyName } from '../utils/formatting';

const ContactList = ({
  contacts,
  selectedContacts = [],
  onContactSelect,
  onAssociate,
  loading = false,
  showBatchActions = true
}) => {
  // コンタクトが選択されているかチェック
  const isSelected = (contactId) => selectedContacts.includes(contactId);
  
  // 個別関連付け処理
  const handleAssociate = (contactId) => {
    if (onAssociate) {
      onAssociate(contactId);
    }
  };
  
  // 選択状態の切り替え
  const handleSelectToggle = (contactId) => {
    if (onContactSelect) {
      onContactSelect(contactId);
    }
  };
  
  if (!contacts || contacts.length === 0) {
    return (
      <Flex direction="column" align="center" gap="medium">
        <Text>表示可能なコンタクトがありません</Text>
      </Flex>
    );
  }
  
  return (
    <Table>
      <TableHead>
        <TableRow>
          {showBatchActions && (
            <TableHeader width="50px">
              <Text>選択</Text>
            </TableHeader>
          )}
          <TableHeader>名前</TableHeader>
          <TableHeader>メール</TableHeader>
          <TableHeader>会社</TableHeader>
          <TableHeader>操作</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map(contact => (
          <TableRow key={contact.id}>
            {showBatchActions && (
              <TableCell>
                <Checkbox
                  checked={isSelected(contact.id)}
                  onChange={() => handleSelectToggle(contact.id)}
                  disabled={loading}
                />
              </TableCell>
            )}
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
                variant="primary"
                size="extra-small"
                onClick={() => handleAssociate(contact.id)}
                disabled={loading}
              >
                関連付け
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactList;