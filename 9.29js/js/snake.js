function Snake(){
    this.snake = ['0_0','1_0','2_0'];
    this.scene = document.querySelector('div.scene');
    this.direction = 39;
    this.flag = {'0_0':true,'1_0':true,'2_0':true};
    this.food = '';
}
Snake.prototype={
    start:function(){
       this.drawline();
       this.drawsnake();
       this.move();
       this.key();
       this.dropFood();
    },
    drawline:function(){
        // i=>y  j=>x
        for(let i=0; i<20;i++){
            for(let j=0;j<20;j++){
                this.scene.innerHTML += `<div class="block" id="${i}_${j}"></div>`
            }
        }

    },
    drawsnake:function(){
        this.snake.forEach(element=>{
            document.getElementById(element).classList.add('hot');

        })

    },
    move:function(){
        let that = this ;
        this.t = setInterval(function(){
            let oldt = that.snake[that.snake.length-1];
            let arr = oldt.split('_');  // 新头坐标
            let newt = '';
            if(that.direction==37){
                newt = `${arr[0]*1}_${arr[1]*1-1}`;
            }else if(that.direction==38){
                newt = `${arr[0]*1-1}_${arr[1]}`;
            }else if(that.direction==39){
                newt = `${arr[0]}_${arr[1]*1+1}`;
            }else if(that.direction==40){
                newt = `${arr[0]*1+1}_${arr[1]}`;
            }
            let newarr = newt.split('_');  // 拆分新头
            if(newarr[1]<0 || newarr[1]>19 ||newarr[0]<0 || newarr[0]>19 || that.flag[newt] ){
                clearInterval(that.t);
                alert('game over');
            }

            // 新头坐标==食物  newt that.food 都为字符串
            if(newt==that.food){
                that.snake.push(newt);
                that.flag[newt]=true;
                document.getElementById(that.food).style.background='rgba(255,255,255,1)';
                that.dropFood();
            }else{
                that.snake.push(newt);
                that.flag[newt] = true;
                let weiba = that.snake.shift();
                delete that.flag[weiba];
                document.getElementById(weiba).classList.remove('hot');
            }

            that.drawsnake();
        },300)
    },
    key:function(){
        document.onkeydown=function(e){
            let keycode = e.keyCode;
            if(Math.abs(keycode-this.direction)==2){
                return;
            }
            this.direction = keycode;

        }.bind(this)
    },
    dropFood:function(){
        let x = Math.floor(Math.random()*20);
        let y = Math.floor(Math.random()*20);
        /*x_y*/
        // 食物防止出现在蛇身上
        do{
            x = Math.floor(Math.random()*20);
            y = Math.floor(Math.random()*20);
        }while(this.flag[`${x}_${y}`])
        // 找到不和蛇重复的食物，存下来
        this.food = `${x}_${y}`;
        // 将食物染色，并存下来
        document.getElementById(this.food).style.background = 'red';

    }
}