
export const fileUpload = async( file ) => {
    if( !file ) throw new Error("We don't have any files to upload")

    const cloudUrl = 'https://api.cloudinary.com/v1_1/djqemmenz/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-styleStore');
    formData.append('file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('Can not upload image')

        const cloudResp = await resp.json();


        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}