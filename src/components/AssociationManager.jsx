import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@hubspot/ui-extensions';

import useAssociation from '../hooks/useAssociation';
import { UI_MESSAGES } from '../constants/messages';

const AssociationManager = ({ 
  dealId, 
  onAssociationChange 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);
  
  const {
    loading,
    error
  } = useAssociation(dealId);
  
  // モーダル表示の処理
  const showConfirmModal = (config) => {
    setModalConfig(config);
    setShowModal(true);
  };
  
  // モーダルを閉じる処理
  const closeModal = () => {
    setShowModal(false);
    setModalConfig(null);
  };
  
  // 確認処理
  const handleConfirm = async () => {
    if (modalConfig && modalConfig.onConfirm) {
      try {
        await modalConfig.onConfirm();
        if (onAssociationChange) {
          onAssociationChange();
        }
      } catch (err) {
        console.error('Association operation failed:', err);
      }
    }
    closeModal();
  };
  
  return (
    <>
      {error && (
        <Alert title="操作エラー" variant="error">
          <Text>{error}</Text>
        </Alert>
      )}
      
      {/* 確認モーダル */}
      {showModal && modalConfig && (
        <Modal
          onClose={closeModal}
          size="medium"
        >
          <ModalHeader>
            <Text variant="microcopy" format={{ fontWeight: 'bold' }}>
              {modalConfig.title}
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text>{modalConfig.message}</Text>
            {modalConfig.details && (
              <Text variant="microcopy">
                {modalConfig.details}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Flex direction="row" gap="small" justify="end">
              <Button
                variant="secondary"
                onClick={closeModal}
                disabled={loading}
              >
                キャンセル
              </Button>
              <Button
                variant={modalConfig.variant || 'primary'}
                onClick={handleConfirm}
                disabled={loading}
              >
                {modalConfig.confirmText || '確認'}
              </Button>
            </Flex>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default AssociationManager;