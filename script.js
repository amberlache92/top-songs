$(document).ready(function(){

                var countryCode;
                
                var country;
                var number;
            

                     //sliderUI to choose number of songs wanted
                  $( function() {
                        $( "#slider" ).slider({

                           max:30,
                           min:5,
                           change:function(event, ui){
                              $('#chosen').text(ui.value);  //changes the current value when slider is changes
                           }
                        });
            } );


    
             
        
        
              
      
                $("#country").change(function (){ // makes it so that the dta changes everytime you select a new option

                   // $("#button").click(function () {
                                  //button parses data


                     $('#song').empty(); //in order to remove previous data

                     countryCode=$('#country').find(':selected').attr('value'); 
                      country= $('#country').val(); //this in order to put in our map api later to find country on map
                      number=$('#chosen').text();
                       $('#map').show();

                
              // grabes the information from itunes data
                $.get('https://itunes.apple.com/' + countryCode + '/rss/topsongs/limit='+number+ '/xml', function(data){
                           
                          

                           var songArray =$(data).find('entry');

                           songArray.each(function(){

                                var title= $(this).find("title").text(); //grab song title
                                var artist= $(this).find("im\\:artist, artist").text(); //grab artist namee
                                var album =$(this).find("im\\:name,name").text(); //grab album name
                                var image=$(this).find("im\\:image,image").eq(2).text(); //grab image link
                                var audioLink=$(this).find("link").eq(1).attr("href"); //grab music file
                                var audio= document.createElement('AUDIO');
                                 audio.setAttribute('controls', 'controls');
                                 var source = document.createElement('source');
                                 source.src = audioLink;

                                  audio.appendChild(source)                      
                                   // var audio= $('<audio');                                           

                      
                                   // audio.attr('src', audioLink);

                                  // youtube api
                        
                                      
                                      // Set the search term
                                      var searchTerm = title;
                                      
                                      var link;
                                  
                                      
                                      var url = "https://www.googleapis.com/youtube/v3/search?q=" 
                                      + searchTerm + "&part=snippet&maxResults=1&key=AIzaSyBvccDrp39n-InLrjDvv4PH_vfNbN0J_iE";
                                    
                                      $.getJSON(url, function(data){
                                        
                                        var id = data.items[0].id.videoId; //videoID for song


                                    
                                        link = "https://www.youtube.com/watch?v=" + id; 
                                          
                                               
                                            $("#song").append(
                                            
                                        "<div> Song :" + title + "<br> Artist :" + artist +  " <br>album: " + album + "<br>" +  "<img src="  + image + "> " +  "<a href= " +  link +  ">"  +' Watch Video'+ "</a>  "+ " </div>  "

                                              
                                  );
                                        //$('#song').append(audio);    

                                      });
                                


                },"xml");

                     }); 


             
                //google map api, code taken from week 14
                   var geocoder = new google.maps.Geocoder();
                  
                    var place = country;
                  
                  //use the geocode method of the location object to get the 
                  //latitude and longitude of the place
                  geocoder.geocode({address: place}, function(results) {
                  
                        var lat = results[0].geometry.location.lat();
                        var lon = results[0].geometry.location.lng();
                       
                        
                        //create the longitude and latitude object
                        var myLatLng = new google.maps.LatLng(lat, lon);
                        
                        //place the marker on the map
                        geocoder.geocode({location: myLatLng}, function(results) {
                          var mapOptions = {
                            zoom: 6, 
                            center: myLatLng, 
                            mapTypeId: google.maps.MapTypeId.ROADMAP 
                          }
                          var map = new google.maps.Map($("#map").get(0), mapOptions);
                      
                          var marker = new google.maps.Marker( {
                            position: myLatLng,
                            map: map    
                          });
                        });
                  });  //end of google api 

      }); //end of change funtion
      //   }); //end of click function
   
});  
