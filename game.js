const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const widthRaketka = 150;

var speed = 5;
var pX = width / 2;
var pY = height - 40;
var paused = false;
var fail = false;

class Raketka 
{

   constructor(x, y, p_width, p_height) 
   {
      this.px = x;
      this.py = y;
      this.p_width = p_width;
      this.p_height = p_height;
      this.color1 = 'green';
   }

   DrawRaketka() 
   {
      ctx.beginPath();
      ctx.fillStyle = this.color1;
      ctx.fillRect(this.px, this.py, this.p_width, this.p_height);
      ctx.fill();
   }

   UpdateRaketka(pX, pY) 
   {
      if ((pX + this.p_width) < width && (pX) > 0) 
      {
         this.px = pX;
         this.py = height - 40;
      }
   }

}

class Ball 
{

   constructor(x, y, velX, velY, color, size) 
   {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
      this.count = 0;
      this.level = 0;
      this.score = 0;
   }

   Random(min, max) 
   {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
   }

   DrawText() 
   {
      ctx.font = "3em Comic Sans MS";
      ctx.fillStyle = "grey";
      ctx.fillText('Score - ' + this.score, 10, 50);
      ctx.fillText('Level = ' + this.level, 10, 100);
   }

   DrawPause_Fail(text, text_x) 
   {
      ctx.font = "3em Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.fillText(text, text_x, height/2);
   }
  
   DrawBall() 
   {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   UpdateBall() 
   {
      if ((this.x + this.size) >= width) 
      {
         this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) 
      {
         this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) 
      {
         fail = true;
         this.DrawPause_Fail('You fail', width/2-95);
      }

      if ((this.y - this.size) <= 0) 
      {
         this.velY = -(this.velY);
      }

      if (((this.x + this.size / 3) >= pX - 5 && (this.x + this.size / 3) <= pX + widthRaketka + 5) &&
         ((this.y + this.size / 3) >= height - 60 && (this.y + this.size / 3) <= height - 20)) 
      {
         this.count++;
         if (this.count == 10) 
         {
            speed++;
            this.velX += speed;
            this.count = 0;
            this.level++;
         }
         this.velY = -(this.velY);
         //this.velX = random(-7, 7);
         this.x += this.Random(-10, 10);
         this.y += this.velY;
         ball.color = this.color = 'rgb(' + this.Random(160, 255) + ',' + this.Random(20, 65) + ',' + this.Random(100, 200) + ')';
         this.score++;
      } 
      else 
      {
         this.x += this.velX;
         this.y += this.velY;
      }
   }

}


let ball = new Ball(width / 2, 20, speed, speed, 'rgb(255, 47, 116)', 15);
let raketka = new Raketka(width / 2, height - 40, widthRaketka, 20);

function MouseMove(event) 
{
   pX = event.pageX;
   pY = event.pageY;
   // pX === event.clientX + (window.pageYOffset || document.body.scrollTop);
}

function MouseClick()
{
             if (!paused)
             {
                 paused = true;
             } 
             else if (paused)
             {
                 paused= false;
             }
}

function loop() 
{
  if(fail)
  {
     
  }
   document.addEventListener('click', MouseClick) ;

   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.clearRect(0, 0, width, height);

   document.addEventListener('mousemove', MouseMove);
   
   raketka.DrawRaketka();
   ball.DrawText();
   ball.DrawBall();
   if(!paused)
   { 
   raketka.UpdateRaketka(pX, pY);
   ball.UpdateBall();
   }
   else
   {
      ball.DrawPause_Fail('Pause', width/2-60);
   }
   requestAnimationFrame(loop);
}

loop();