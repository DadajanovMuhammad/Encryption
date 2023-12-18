window.addEventListener('DOMContentLoaded',()=>{
    const tabsParent =document.querySelector('.tabheader__items'),
    tabs=document.querySelectorAll('.tabheader__item'),
    tabsContent=document.querySelectorAll('.tabcontent'),
    enycrpttype=document.querySelector('.mathvalues'),
    btn=document.querySelector('.btngo'),
    text=document.querySelector('.enctexet'),
    ochiqtext=document.querySelector('.ochiq-text'),
    key=document.querySelector('.key'),
    deenycrpttype=document.querySelector('.de-mathvalues'),
    debtn=document.querySelector('.de-btngo'),
    detext=document.querySelector('.de-enctexet'),
    deochiqtext=document.querySelector('.de-ochiq-text'),
    dekey=document.querySelector('.de-key')

    
    let alphabet=['A','B','C','D','E','F','G','H','I','J', 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','`','_','.',',']
    // let alphabet=['A','B','C','D','E','F','G','H','I','J', 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','`','_','.',',']


    function stringToIntList(string){               
        let s = new Array();
        for (let i = 0; i < string.length; i++) {
            s[i] = string.charCodeAt(i);
        }
        return s;
    }
    function intsToCharList(integers)               {
        let ints = new Array();
        for (let i = 0; i < integers.length; i++) {
            ints[i] = String.fromCharCode(integers[i]);
        }
        return ints;
    }
    function makeTable(){
        let table = new Array();
        let minASCII=65
        let maxASCII=122
        // let minASCII = parseInt(document.getElementById('minASCII').value);
        // let maxASCII = parseInt(document.getElementById('maxASCII').value);
        let i = 0;
        while (i+minASCII < maxASCII) {
            let line = new Array();
            for (let j = 0; j < maxASCII - minASCII; j++) {
                if (j+i+minASCII >= maxASCII) {
                    line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
                } else {
                    line[line.length] = j+i+minASCII;
                }
            }
            table[table.length] = line;
            i++;
        }
        return table;
    }
    function printTable(){
            let t = makeTable();
            document.getElementById("ascii").innerHTML = "";
            for (let i = 0; i < t.length; i++) {
                document.getElementById("ascii").innerHTML = document.getElementById("ascii").innerHTML+
                "<tr><td>"+intsToCharList(t[i]).join("</td><td>")+"</td></tr>";
            }
    }

        btn.addEventListener('click',()=>{


            let shifrlangan=``
            
            
               if(enycrpttype.value=='sezer'){
                let kalit=0;
                kalit=+(key.value)
                for(let i=0;i<(ochiqtext.value).length;i++){
                    let code=(ochiqtext.value).charCodeAt(i)
                    
                    if((code)>=65 && (code)<=90){
                        shifrlangan+=String.fromCharCode(65+(code+kalit)%65%26)
                    }else if((code)>=97 && (code)<=122){
                        shifrlangan+=String.fromCharCode(97+(code+kalit)%97%26)
                    }else{
                        shifrlangan+=String.fromCharCode(code)
                    }
                        
                    }
                
                text.value=" "
                text.value=`${shifrlangan}`
               }


               if(enycrpttype.value=='vernam'){
                let temp = 0, temp2 = 0;
                let kalit = key.value.toUpperCase();
                let ochmatn=ochiqtext.value.toUpperCase()
                    for (let i = 0; i < (ochmatn).length; i++){
                        for (let j = 0; j < alphabet.length; j++){
                            if (ochmatn[i] === alphabet[j]){
                                temp = j;
                                }
                            if (i >= kalit.length){
                                if (kalit[i - kalit.length] === alphabet[j]) {
                                    temp2 = j;
                                }
                            }
                            else if (kalit[i] === alphabet[j]) {
                                temp2 = j;
                            }
                        }
                        shifrlangan+=alphabet[temp^temp2];
                    }
    
                text.value=' '
                text.value=`${shifrlangan}`
               }


               if(enycrpttype.value=='vijiner'){

                let text1 = stringToIntList(ochiqtext.value);
                let kalit = stringToIntList(key.value);
                let table = makeTable();
                let keyChar = 0;
                let message = new Array();
                while(message.length<text1.length) {
                    for(let i = 0; i < text1.length; i++) {
                        let row = table[0].indexOf(kalit[keyChar]);
                        let col = table[0].indexOf(text1[i]);
                        message[message.length] = table[row][col];
                        if (keyChar<kalit.length-1) {
                            keyChar++;
                        } else {
                            keyChar = 0;
                        }
                    }
                }
        message = intsToCharList(message).join("");
        // text.innerHTML = `${message}`;
        text.value=` `
        text.value=message
                
        printTable()

            }
        })

        // dencryption
        debtn.addEventListener('click',()=>{
            let deshifrlangan=``
            
            
               if(deenycrpttype.value=='sezer'){
                let kalit=0;
                kalit=+(dekey.value)
                for(let i=0;i<(deochiqtext.value).length;i++){
                    let decode=(deochiqtext.value).charCodeAt(i)
                    
                    if((decode)>=65 && (decode)<=90){
                        deshifrlangan+=String.fromCharCode(65+(decode-kalit)%65%26)
                    }else if((decode)>=97 && (decode)<=122){
                        deshifrlangan+=String.fromCharCode(97+(decode-kalit)%97%26)
                    }else{
                        deshifrlangan+=String.fromCharCode(decode)
                    }
                        
                    }
                
                detext.value=" "
                detext.value=`${deshifrlangan}`
               }
               if(deenycrpttype.value=='vernam'){
                // let kalit='';
                // let kalit=' '
                let temp = 0, temp2 = 0;
                let dekalit = dekey.value.toUpperCase();
                let deochmatn=deochiqtext.value.toUpperCase()
                    for (let i = 0; i < (deochmatn).length; i++){
                        // console.log(ochiqtext.value[i]);
                        for (let j = 0; j < alphabet.length; j++){
                            if (deochmatn[i] === alphabet[j]){
                                temp = j;
                                }
                            if (i >= dekalit.length){
                                if (dekalit[i - dekalit.length] === alphabet[j]) {
                                    temp2 = j;
                                }
                            }
                            else if (dekalit[i] === alphabet[j]) {
                                temp2 = j;
                            }
                        }
                        deshifrlangan+=alphabet[temp^temp2];
                    }
    
                detext.value=' '
                detext.value=`${deshifrlangan}`
               }
               if(deenycrpttype.value=='vijiner'){

                cipher = stringToIntList(deochiqtext.value);
	            kalit = stringToIntList(dekey.value);
	            let table = makeTable();
	            let keyChar = 0;
	            let message = new Array();
	            while (message.length<cipher.length) {
		            for (let i = 0; i < cipher.length; i++) {
			            let row = table[0].indexOf(kalit[keyChar]);
			            let col = table[row].indexOf(cipher[i]);
			            message[message.length] = table[0][col];
			            if (keyChar<kalit.length-1) {
				            keyChar++;
			            } else {
				            keyChar = 0;
			            }
		            }
	            }
	            message = intsToCharList(message).join("");
	            detext.value = `${message}`;


            }
        })





    function hideTabContent(){
        tabsContent.forEach(item=>{
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })


        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i=0){
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }
hideTabContent()
showTabContent()
tabsParent.addEventListener('click',(event)=>{
    const target = event.target
    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item,idx)=>{
            if(target==item){
                hideTabContent()
                showTabContent(idx)
            }
        })
    }
})

//scrol btn
const scrollbtn =document.querySelector('.scrollToTop-btn')
     window.addEventListener('scroll',()=>{
        scrollbtn.classList.toggle('active',window.scrollY>500)
     })
     scrollbtn.addEventListener('click',()=>{
        this.document.body.scrollTop=0;
        this.document.documentElement.scrollTop=0;
     })

     //crimson head
     window.addEventListener('scroll', function(){
        const header = document.querySelector('header');
        header.classList.toggle('sticky',window.scrollY>0);
    })

})
