import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
const Entry = () => {

  const [login, setlogin] = useState(false);
  const router = useRouter();

  // const { open, setOpen, openEdit, setOpenEdit, openQRCode, setOpenQRCode ,setUrl,url} =
  //   useContext(Project_Page_Ctx)
  useEffect(() => {
    if (login) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, []);

  return <>
  (

  )
  </>;
};

          // <Modal open={openQRCode} onClose={handleCloseQRCode}>
          //   <QRComponent url={url}/>
          // </Modal>
export default Entry;
