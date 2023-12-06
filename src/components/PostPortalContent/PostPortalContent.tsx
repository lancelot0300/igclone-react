import { create } from 'domain';
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';


interface IProps {
 setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
 showModal: boolean;
}


const PostPortalContent = ( {setShowModal, showModal} : IProps) => {

   useEffect(() => {
    console.log('PostPortalContent')
    console.log(showModal)
    return () => {
      console.log('PostPortalContent unmount')
    }
    }
    , [showModal])

  return (
    showModal ? (
        createPortal(
            <div>
                <h1>PostPortalContent</h1>
            </div>,
            document.getElementById('root')!
        )
    ) : null
  )
}

export default PostPortalContent
