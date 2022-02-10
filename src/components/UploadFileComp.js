import React from "react";
/**
 * hiddenFileRef --- (Reference, this input component is by default hide, 
      we connect this component our custom button and pass it reference - Required)
 * handleUpload --- (Function when we upload file - Required)
 * acceptTypeFile --- (input accept type files - default Images - Optional)
 */

const UploadFileComp = ({ hiddenFileRef, handleUpload, acceptTypeFile }) => {
  return (
    <>
      <input
        type="file"
        ref={hiddenFileRef}
        className="upload-file-btn"
        onChange={handleUpload}
        accept={acceptTypeFile ?? "image/*"}
      />
    </>
  );
};

export default UploadFileComp;
