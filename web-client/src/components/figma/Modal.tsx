import { Modal } from 'antd';
import React from 'react';

export const GenericFigmaModal: React.FC<GenericFigmaModalProps> = ({
  finishRequestHandler,
  children,
  ...modalProps
}) => {

  const handleOKClose = (): void => {
    finishRequestHandler && finishRequestHandler();
  };
  
  return (
    <Modal
      {...modalProps}
      onOk={() => handleOKClose()}
      onCancel={() => handleOKClose()}
      // style this further to meet any standards specified in Figma and use this instead of the antd Modal
    >
      {children}
    </Modal>
  );
}

interface GenericFigmaModalProps {
  children?: any;
  visible: boolean;
  footer: any;
  closable: boolean;
  title: string | null;
  finishRequestHandler?: () => void;
}

export default GenericFigmaModal;
