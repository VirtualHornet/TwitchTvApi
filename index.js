function App(){   
    const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    const [activeOption, setActiveOption] = React.useState('option1');
    let offline = "";

    function setStreamURL(channel){
        console.log('https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/'+channel+'?callback=')
        return 'https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/'+channel+'?callback='
    }

    function setchannelURL(channel){
        console.log('https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/'+channel+'?callback=')
        return 'https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/'+channel+'?callback='
    }

    function getData(){
        for(let i = 0; i!=channels.length; i++){
        let url = setStreamURL(channels[i]);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let game = "";
            let status = "";
            if(data.stream === null || data.stream === undefined){
                       offline+=channels[i];
                        console.log(channels[i])
                }else{
                        game = data.stream.game;
                
            console.log(data)    

            if(data.stream !== null){
                if(data.stream.channel.status.length > 30){
                status = data.stream.channel.status.slice(0, 30)+"...";
                }
            }else{
                status = data.stream.channel.status;
            }

             
                let html = "";
                        html += "<div class = 'online row bg-success'>";
                        html += "<div class='col-3 text-left '><img src="+data.stream.channel.logo+" width=\"50\" height=\"50\"/></div>"
                        html += "<div class ='col-3 text-left   p-2'>"+"<a href="+data.stream.channel.url+">"+data.stream.channel.display_name+"</a></div>"    
                        html += "<div class ='col-6 text-left  p-2'>"+game+" "+status+"</div>"
                        html +=  "</div>";
                        document.getElementsByClassName("channels")[0].innerHTML+=html;
                   
            }})
            .catch(error => console.error(error));
           
        
        };  
    } 

      
    

    function getOfflineData(){
        console.log("Offline"+ offline)
        for(let i = 0; i!=channels.length; i++){
        let url = setchannelURL(channels[i]);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(offline.includes(channels[i])){
                let game = "Offline"
                let html = "";
                html += "<div class = 'offline row bg-secondary'>";
                        html += "<div class='col-3 text-left '><img src="+data.logo+" width=\"50\" height=\"50\"/></div>"
                        html += "<div class ='col-3 text-left  p-2'>"+"<a href="+data.url+">"+data.display_name+"</a></div>"    
                        html += "<div class ='col-6 text-left  p-2'>"+game+"</div>"
                        html +=  "</div>";
                        
                document.getElementsByClassName("channels")[0].innerHTML+=html;
            }
           
        })
    
        }
    }

    React.useEffect(()=>{ 
        getData();
        getOfflineData();     
    },[]);

    const handleOptionChange = (event) => {
        const option = event.target.value;
    
        switch (option) {
          case 'option1':
            document.querySelectorAll('.online').forEach(element => element.classList.remove('hidden'));
            document.querySelectorAll('.offline').forEach(element => element.classList.remove('hidden'));
            break;
          case 'option2':
            document.querySelectorAll('.online').forEach(element => element.classList.remove('hidden'));
            document.querySelectorAll('.offline').forEach(element => element.classList.add('hidden'));
            break;
          case 'option3':
            document.querySelectorAll('.online').forEach(element => element.classList.add('hidden'));
            document.querySelectorAll('.offline').forEach(element => element.classList.remove('hidden'));
            break;
          default:
            document.querySelectorAll('.online').forEach(element => element.classList.remove('hidden'));
            document.querySelectorAll('.offline').forEach(element => element.classList.remove('hidden'));
            break;
        }
    
        setActiveOption(option);
      };


   

    return (
        <div>
            <h1 className="text-center">Twitch Channels</h1>
            <div className="radio">
            <label>
                <input
                    type="radio"
                    name="options"
                    value="option1"
                    checked={activeOption === 'option1'}
                    onChange={handleOptionChange}
                />
                All
            </label>
            <label>
                <input
                    type="radio"
                    name="options"
                    value="option2"
                    checked={activeOption === 'option2'}
                    onChange={handleOptionChange}
                />
                Online
            </label>
            <label>
                <input
                    type="radio"
                    name="options"
                    value="option3"
                    checked={activeOption === 'option3'}
                    onChange={handleOptionChange}
                />
                Offline
            </label>
            </div>

            <div id="container" className="text-center">
                <div className="channels"  ></div>
            </div>
            
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

root.render(<App/>)