let     audio = new Audio();
    audio.src = "/source.mp3";
const canvas  = document.getElementById( "canvas" );
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
const context = new ( window.AudioContext || window.webkitAudioContext )();
let source = context.createMediaElementSource( audio ),
  analyzer = context.createAnalyser();
source.connect( analyzer );
analyzer.connect( context.destination );
analyzer.fftSize = 128;
let buflen = analyzer.frequencyBinCount,
data = new Uint8Array( buflen )
barwidth = canvas.width / buflen;
function starter()
{
    audio.play();
    animate();
}

function animate()
{
    x = 0;
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    analyzer.getByteFrequencyData( data );
    for ( let i = 0 ; i < buflen ; i++ )
    {
        barheight = data[i];
        ctx.fillStyle = "white";
        ctx.fillRect( x, canvas.height - barheight, barwidth, barheight );
        x += barwidth;
    }
    requestAnimationFrame(animate);
}
window.onload = function()
{
    const startbutton = document.getElementById( "startbutton" );
    startbutton.onclick = starter;
};