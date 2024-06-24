document.addEventListener("DOMContentLoaded", function() {
    console.log('hello!!');
    console.log(localStorage.length)
    const search_box=document.getElementById('search_box');
    const search_bar=document.getElementById('search_bar');
    const dialog=document.getElementsByClassName('dialog_window');
    const edialog=document.getElementsByClassName('edit_dialog');
    const show=document.getElementById('add_notes');
    const create=document.getElementById('create');
    const cancel=document.getElementById('cancel');
    const ecreate=document.getElementById('ecreate');
    const ecancel=document.getElementById('ecancel');
    const collection=document.getElementById('notes_collection');
    const dia_box=this.getElementById('dia_')
    const ol=document.getElementById('ordered_list');
    const l_button=document.getElementById('left_button');
    const r_button=document.getElementById('right_button')
    const page=document.getElementById('page_no')
    let max_page = Math.floor(localStorage.length / 10);
    let remainder = localStorage.length % 10;
    if (remainder>0){
        max_page=max_page+1
    }
    let ar=[]
    for (let i=0;i<localStorage.length;i++){
        let k=localStorage.key(i)
        let v=localStorage.getItem(k).slice(-10,)
        ar.push({k,v})
    }
    ar.sort((a,b)=> Date.parse(b.v) - Date.parse(a.v))
    console.log(`keys: ${ar.k}`)


    r_button.addEventListener('click',()=>{
        while (collection.firstChild) {
            collection.removeChild(collection.lastChild);
          }
        page.innerHTML=parseInt(page.innerHTML)+1
        console.log(page.innerHTML)
        if (parseInt(page.innerHTML)>=max_page){
            page.innerHTML=max_page-1
        }
        l_range=parseInt(page.innerHTML)*10
        r_range=(parseInt(page.innerHTML)+1)*10
        for (let i = 0; i < localStorage.length; i++) {
            if (i<l_range){
                continue
            }
            if (i>=r_range){
                break
            }
            const list = list_of_notes(i);
            list.id = i;
            console.log('done')
            collection.appendChild(list);
            machine()
          }
    })

    l_button.addEventListener('click',()=>{
        while (collection.firstChild) {
            collection.removeChild(collection.lastChild);
          }
        page.innerHTML=parseInt(page.innerHTML)-1
        console.log(page.innerHTML)
        if (parseInt(page.innerHTML)<0){
            page.innerHTML=0
        }
        l_range=parseInt(page.innerHTML)*10
        r_range=(parseInt(page.innerHTML)+1)*10
        for (let i = 0; i < localStorage.length; i++) {
            if (i<l_range){
                continue
            }
            if (i>=r_range){
                break
            }
            const list = list_of_notes(i);
            list.id = i;
            console.log('done')
            collection.appendChild(list);
            machine()
          }
    })


    search_bar.addEventListener('input',()=>{
        const lis = ol.querySelectorAll('li');
        if (lis.length > 0) {
            console.log(`lenght:${lis.lenght} , removed`)
            lis.forEach(li => ol.removeChild(li));
        }
        const input=document.getElementById('search_bar').value;
        list_box=search_list(input.toLowerCase());
        //console.log(input)
        const lis_ = ol.querySelectorAll('li');
        if (lis_.length<=0){
            const listItem = document.createElement('li');
            listItem.className='ol_list';
            listItem.textContent = 'No result found..';
            ol.appendChild(listItem);
            search_box.appendChild(ol)
        }
        search_box.appendChild(list_box);
        list_box.style.display = input.trim() ? 'inline-block' : 'none';

    })

    show.addEventListener('click', () => {
        dialog[0].showModal();
      });
    
    cancel.addEventListener('click',() => {
        dialog[0].close();
        console.log('cancelled');
    });

    create.addEventListener('click',() =>{
        const title_values= document.getElementById('title_').value;
        const notes_value=document.getElementById('notes_').value;
        const date=new Date();
        dialog[0].close();
        var Object=[notes_value,date.toISOString().split('T')[0],date.toISOString().split('T')[0]];
        localStorage.setItem(title_values,Object);
        this.location.reload(true);
    });

    ecreate.addEventListener('click',() =>{
        const title_values= document.getElementById('etitle_').value;
        const notes_value=document.getElementById('enotes_').value;
        const date_created_html_value=document.getElementById('date_created_html').value;
        const date=new Date();
        edialog[0].close();
        var Object=[notes_value,date_created_html_value,date.toISOString().split('T')[0]];
        localStorage.setItem(title_values,Object);
        this.location.reload(true);
    });

    ecancel.addEventListener('click',() => {
        edialog[0].close();
        console.log('cancelled');
    });

    function search_list(item){
        s_list=[];
        for(let i=0;i<localStorage.length;i++){
            key=localStorage.key(i).toLowerCase();
            //console.log(`key:${key}, lenght:${localStorage.length}`)
            if(key.indexOf(item) !== -1){
                s_list.push(i)
                //console.log(`matched no are ${i}`);
            }
        }
        for(let i=0;i<s_list.length;i++){
            const listItem = document.createElement('li');
            listItem.className='ol_list';
            listItem.id=s_list[i];
            listItem.textContent = localStorage.key(s_list[i]);
            //console.log(`list no: ${s_list[i]}, listed item :${localStorage.key(s_list[i])}`)
            ol.appendChild(listItem);
            listItem.addEventListener('click',() =>{
                
                // -----------
                const dia_=document.createElement('dialog');
                dia_.id='dia'
                const br=document.createElement('br')
                const close_ =document.createElement('button');
                close_.id='close_';
                close_.innerText='X';
                const dialogTitle_ = document.createElement('h3');
                dialogTitle_.className = 'dtitle';
                dialogTitle_.innerText = localStorage.key(s_list[i]);
                const note_=document.createElement('p');
                note_.className='notes';
                a=localStorage.key(s_list[i]);
                note_.textContent=localStorage.getItem(a).slice(0,-22);
                dia_.appendChild(close_);
                dia_.appendChild(dialogTitle_);
                dia_.appendChild(br);
                dia_.appendChild(note_);
                dia_box.appendChild(dia_)
                // ------------
                // const dia=document.querySelectorAll('#dia');
                // dia[s_list[i]].showModal();
                dia_.showModal()
                const close__=document.querySelectorAll('#close_');
                close__[0].addEventListener('click', () => {
                    dia_.close();
                    dia_.remove();
                    console.log(`the dia is ${dia_box.innerHTML}`)
                });
            })
        }

        return ol;
    }
    function list_of_notes(n){
        const box=document.createElement('div');
        box.className='box';

        const title=document.createElement('h2');
        title.className='title';
        //
        title.textContent=ar[n].k;

        const dialogTitle = document.createElement('h3');
        dialogTitle.className = 'dtitle';
        //
        dialogTitle.innerText = ar[n].k;

        const note=document.createElement('p');
        note.className='notes';
        //
        a=ar[n].k;
        note.textContent=localStorage.getItem(a).slice(0,-22);

        const date_created=document.createElement('p');
        date_created.className='date_created';
        //
        a=ar[n].k;
        date_created.textContent='Date Created : '+ localStorage.getItem(a).slice(-21,-11);

        const date_updated=document.createElement('p');
        date_updated.className='date_updated';
        //
        a=ar[n].k;
        date_updated.textContent='Date Updated : '+localStorage.getItem(a).slice(-10,);
        
        const open=document.createElement('button');
        open.id='open';
        open.className='button'
        open.innerText='open'

        const close =document.createElement('button');
        close.id='close';
        close.innerText='X';

        const delete_=document.createElement('button');
        delete_.id='delete';
        delete_.className='button';
        delete_.innerText='Delete';
        
        const edit=document.createElement('button');
        edit.id='edit';
        edit.className='button';
        edit.innerText='Edit';

        const br=document.createElement('br');

        const dia=document.createElement('dialog');
        dia.id='dia'
        
        box.appendChild(title);
        box.appendChild(br);
        box.appendChild(date_created);
        box.appendChild(br);
        box.appendChild(date_updated)
        box.appendChild(open);
        box.appendChild(delete_);
        box.appendChild(edit);
        dia.appendChild(close);
        dia.appendChild(dialogTitle);
        dia.appendChild(br);
        dia.appendChild(note);
        box.appendChild(dia);

        return box;
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (i>=10){
            break;
        }
        const list = list_of_notes(i);
        list.id = i;
        console.log('done')
        collection.appendChild(list);
      }
    
    function machine(){
        if (localStorage.length>0){
            const notes=document.querySelectorAll('.notes');
            const title=document.querySelectorAll('.title');
            console.log(`title is ${title[0]} and value is ${title[0].value}`);
            const edit=document.querySelectorAll('#edit');
            const open=document.querySelectorAll('#open');
            const delete_=document.querySelectorAll('#delete');
            const close=document.querySelectorAll('#close');
            const dia=document.querySelectorAll('#dia');
            for (let j=0;j<open.length;j++){
                open[j].addEventListener('click', () => {
                    dia[j].showModal();
                });
                delete_[j].addEventListener('click', () => {
                    const result = window.confirm("Do you want to proceed?");
                    if (result){
                        localStorage.removeItem(localStorage.key(j));
                        this.location.reload(true);
                    }
                    
                });
                edit[j].addEventListener('click',() =>{
                    edialog[0].showModal();
                    const title_val= document.getElementById('etitle_');
                    //
                    title_val.value=title[j].innerText//ar[j].k;
                    const notes_val=document.getElementById('enotes_');
                    //
                    notes_val.innerText= notes[j].innerText//localStorage.getItem(a).slice(0,-22);
                    const date_created_html=document.getElementById('date_created_html');
                    date_created_html.value=localStorage.getItem(title[j].innerText).slice(-22,-11);
                });

                close[j].addEventListener('click', () => {
                    dia[j].close();
                    console.log('closed')
                });
            }
        }
    }
    machine()

});