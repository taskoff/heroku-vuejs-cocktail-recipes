const addImage = {
    methods: {
        uploadImage(e) {
            e.preventDefault()
            console.log('fuck')
            const widget = window.cloudinary.createUploadWidget({
                cloudName: 'dxt2tu7ic',
                uploadPreset: 'nq3dvifv'
        
            }, (error, result)=>{
                if(result.event === 'success'){
                    this.imageUrl = result.info.url;
                }
            });
            widget.open()
        }
    }
}



export default addImage;