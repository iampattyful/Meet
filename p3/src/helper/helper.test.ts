import { transfer_formidable_into_obj } from "./helper"


describe('helper', () => {

    

    test('transfer_formidable_into_obj', async () =>{
        let form_result = {
            fields:{content:'i love hk'},
            files:{image:{newFilename:'file.jpg'}}
        }
        expect(transfer_formidable_into_obj(form_result)).toEqual({
            content:'i love hk',
            image:'file.jpg'
        })  
    })

    
    
})