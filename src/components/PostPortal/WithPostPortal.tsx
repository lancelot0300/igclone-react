import React, { FC, useLayoutEffect, useState } from 'react'




interface IProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
}

const WithPostPortal = (WrappedComponent: FC<IProps>) => {
    const WithPost = () => {

      const [showModal, setShowModal] = useState(false);
      return (
      <WrappedComponent
          setShowModal={setShowModal}
          showModal={showModal}
        />
      );
    };
  
    return WithPost;
  }

  export default WithPostPortal;