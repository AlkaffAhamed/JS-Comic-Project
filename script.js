// Last number 2517 as of 21st September 2021 
// Better logic can be applied to detect last image without hardcoding
const last_index = 2517; 

async function getImage(index) 
{
    // https://xkcd.vercel.app/?comic=${current_intex}/1
    const resJson = await fetch(`https://xkcd.vercel.app/?comic=${index}`)
    .then(res => res.json())
    .then(data => 
        {
            return data
        })
    return resJson
}

async function setImages(img1, img2, img3, imgTitle, index)
{
    img1.src = ""
    img2.src = ""
    img3.src = ""
    img1.style = "zoom:100%"
    img2.style = "zoom:100%"
    img3.style = "zoom:100%"

    if(index === last_index)
    {
        const i1 = await getImage(index - 1)
        const i2 = await getImage(index)
        const i3 = await getImage(1)
        
        imgTitle.innerHTML = i2.title
        img1.src = i1.img
        img2.src = i2.img
        img3.src = i3.img
    }
    else if (index === 1)
    {
        const i1 = await getImage(last_index)
        const i2 = await getImage(index)
        const i3 = await getImage(index + 1)

        imgTitle.innerHTML = i2.title
        img1.src = i1.img
        img2.src = i2.img
        img3.src = i3.img
    }
    else
    {
        const i1 = await getImage(last_index)
        const i2 = await getImage(index)
        const i3 = await getImage(index + 1)

        imgTitle.innerHTML = i2.title
        img1.src = i1.img
        img2.src = i2.img
        img3.src = i3.img
    }

    img1.style = "zoom:33%"
    img2.style = "zoom:50%"
    img3.style = "zoom:33%"
}

(async function comicimage()
{
    // https://xkcd.com/1/info.0.json
    // https://intro-to-js-playground.vercel.app/api/xkcd-comics/1
    
    let current_index = 1;

    const btnNext = document.getElementById("btnNext")
    const btnPrev = document.getElementById("btnPrev")
    const btnGo = document.getElementById("btnGo")
    const txtGo = document.getElementById("txtGo")

    const img1 = document.getElementById("img1")
    const img2 = document.getElementById("img2")
    const img3 = document.getElementById("img3")
    const imgTitle = document.getElementById("imgTitle")

    // const i2 = await getImage(current_index)
    // console.log("i2", i2, i2.img, i2.title)
    // let u = i2.img
    // let t = i2.title
    // img2.src = u
    // imgTitle.innerHTML = t
    await setImages(img1, img2, img3, imgTitle, current_index)

    txtGo.value = current_index

    async function loadNext()
    {
        if (current_index === last_index)
        {
            current_index = 1
        }
        else
        {
            current_index ++
        }

        txtGo.value = current_index
        await setImages(img1, img2, img3, imgTitle, current_index)
    }

    async function loadPrev()
    {
        if (current_index === 1)
        {
            current_index = last_index
        }
        else
        {
            current_index --
        }

        txtGo.value = current_index
        await setImages(img1, img2, img3, imgTitle, current_index)
    }

    async function gotoImage()
    {
        let val = Math.floor(txtGo.value)
        txtGo.value = val
        
        if (val > last_index)
        {
            alert("Maximum index is 2517")
        }
        else if (val < 1)
        {
            alert("Minimum index is 1")
        }
        else
        {
            current_index = val
            await setImages(img1, img2, img3, imgTitle, current_index)
        }
    }

    btnNext.onclick = async ()=>
    {
        await loadNext()
    }

    btnPrev.onclick = async ()=>
    {
        await loadPrev()
    }

    btnGo.onclick = async ()=>
    {
        await gotoImage()
    }



})();



// function loadNext()
// {
//     current_intex ++;
//     getJson(current_intex);
// }

// function loadPrev()
// {
//     current_intex --;
//     getJson(current_intex);
// }

