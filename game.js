(function(){

let b=document.getElementById("board"),
    w=document.getElementById("winEffect"),
    P={},p=1,cur={},sel=null;

loadEncryptedPuzzles().then(z=>{
    P=z;
    loadPuzzle(1);
});

function loadPuzzle(n){
    if(!P[n]) return;
    cur=JSON.parse(JSON.stringify(P[n]));
    b.innerHTML="";
    for(let r=0;r<4;r++){
        for(let c=0;c<4;c++){
            let d=document.createElement("div");
            d.className="cell";
            d.dataset.r=r; d.dataset.c=c;

            let t=cur[r][c];
            if(t!=="empty"){
                let i=document.createElement("img");
                i.src="assets/"+t+".png";
                d.appendChild(i);
            }

            d.onclick=()=>clicked(r,c);
            b.appendChild(d);
        }
    }
}

function clicked(r,c){
    let t=cur[r][c];

    // select piece
    if(!sel && t!=="empty" && t!=="block" && t!=="star"){
        sel={r,c,t};
        return;
    }

    if(sel){
        if(canMove(sel.r,sel.c,r,c,sel.t)){
            move(sel.r,sel.c,r,c);
        }
        sel=null;
    }
}

function move(r1,c1,r2,c2){
    let piece = cur[r1][c1];
    cur[r1][c1]="empty";

    if(cur[r2][c2]==="star" && piece==="king"){
        win();
        return;
    }

    cur[r2][c2]=piece;
    loadPuzzle(p);
}

function win(){
    w.style.animation="fadeInCenter 2s forwards";

    setTimeout(()=>{
        window.location.href="https://google.com";
    },2000);
}

function canMove(r1,c1,r2,c2,p){
    let dr=Math.abs(r2-r1), dc=Math.abs(c2-c1);

    if(cur[r2][c2]==="block") return false;

    if(p==="king") return (dr<=1 && dc<=1);

    if(p==="knight") return (dr===2&&dc===1)||(dr===1&&dc===2);

    if(p==="rook"){
        if(r1===r2 && dc>0 && dc<=2) return true;
        if(c1===c2 && dr>0 && dr<=2) return true;
    }

    if(p==="bishop"){
        if(dr===dc && dr>0 && dr<=2) return true;
    }

    return false;
}

})();
