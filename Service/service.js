import 'firebase/app'
import '../firebaseConfig'
import 'firebase/database'
import 'firebase/storage'
import {db, fs} from '../firebaseConfig'

export class ProductService {

    static async deleteSector(sector){
        await db.ref(`sector/${sector.sectorID}`).remove()
    }
    static async addNewSector(sector){
        db.ref("sector").push(sector).then(()=>{
            alert("Sector added successfully")
        })
    }

    static async readSectors(){
        return await new Promise(resolve => {
            db.ref("sector").once("value").then(s=>{
                let data = s.val();
                if(data !== null){
                    resolve(Object.keys(data).map(s=> {
                        let obj = data[s]
                        obj.sectorID = s
                        return obj
                    }));
                }
                else {
                    resolve([])
                }
            })
        });
    }


    static async writeProduct (category, code, brand, url, largeImageUrl, selectedFile, selectedLargeFile) {
        return await new Promise(resolve => {
            db.ref('product/' + category + '/' + code).set({
                brand: brand,
                code: code,
                url: url  + code + '/small',
                largeImageUrl: url + code + '/large'
            })
            let myFileRef = fs.ref().child(category + '/' + code + '/small').put(selectedFile)
            myFileRef.on('state_changed',
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                (error) => {
                    alert('Bir Hata Olustu')
                    console.log(error);
                },
                () => {
                    myFileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            )
            let myLargeFileRef = fs.ref().child(category + '/' + code + '/large').put(selectedLargeFile)
            myLargeFileRef.on('state_changed',
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                (error) => {
                    alert('Bir Hata Olustu')
                    console.log(error);
                },
                () => {
                    myLargeFileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve()
                    });
                }
            )
        })
            .then(() => {
                    location.reload()
            })







        // db.ref('product/' + category + '/' + code).set({
        //     brand: brand,
        //     code: code,
        //     url: url  + code
        // })
        //     .then(() => {
        //             let myFileRef = fs.ref().child(category + '/' + code).put(selectedFile)
        //             myFileRef.on('state_changed',
        //                 (snapshot) => {
        //                     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //                     console.log('Upload is ' + progress + '% done')
        //                 },
        //                 (error) => {
        //                     alert('Bir Hata Olustu')
        //                     console.log(error);
        //                 },
        //                 () => {
        //                     myFileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //                         this.srcImg = downloadURL
        //                         this.imgOk = true
        //                         console.log('File available at', downloadURL);
        //                     });
        //                 }
        //             )
        //     })
            .catch((err) => {
                console.log(err);
            })
    }
    static async getProduct(category) {
        return new  Promise((resolve, reject) => {
            db.ref('product/' + category + '/').on('value', (snap) => {
                const data = snap.val()
                if(data !== null){
                    return resolve(Object.keys(data).map(key => {
                        return {
                            id: key,
                            brand: data[key].brand,
                            code: data[key].code,
                            url: '',
                            largeImageUrl: ''
                        }
                    }))
                } else {
                    reject('error')
                }
            })
        })
    }
    static async getFile (product, category) {
        let myArray = product.map(x => x)
        if(myArray !== null) {
            return Object.keys(product).map(key => {
                let myRef = fs.ref('/' + category + '/' + myArray[key].code + '/small')
                myRef.getDownloadURL()
                    .then((url) => {
                        product[key].url = url
                    })
                return {
                    url: product[key].url
                }
            })
        }
    }

    // static async deleteItem (selected,product, category) {
    //     while(selected.length !== 0) {
    //         let willDeleteItem = selected.pop()
    //         let index = product.indexOf(willDeleteItem)
    //         product.splice(index, 1)
    //         db.ref('/product'+ category + willDeleteItem.code).remove()
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((e) => {
    //                 console.log(e);
    //             })
    //         fs.ref(category + willDeleteItem.code).delete()
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((e) => {
    //                 console.log(e);
    //             })
    //     }
    // }

}
