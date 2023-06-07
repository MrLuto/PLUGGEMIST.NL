var apiKeys = ['AIzaSyDEs4_tFYQf8GCnwRADKu9oTxgYyxdoHa8', 'AIzaSyD7K-3RHylkbywe4sc1_1RWq8SnxMqI9Jo'];
var randomIndex = Math.floor(Math.random() * apiKeys.length);
var randomApiKey = apiKeys[randomIndex];

// Voer het kanaal-ID in van het YouTube-kanaal waarvan je de livestreams wilt ophalen
var channelId = 'UCkQdUdU3rpJRsYcdwGziHpQ';

// Selecteer de container waarin je de gegenereerde code wilt toevoegen
var container = document.getElementById('lightgallery');

// Maak een HTTP GET-verzoek naar de YouTube Data API om de livestreams op te halen
function fetchLivestreams(pageToken) {
    var url = 'https://www.googleapis.com/youtube/v3/search?key=' + randomApiKey + '&channelId=' + channelId + '&part=snippet&maxResults=50' + (pageToken ? '&pageToken=' + pageToken : '');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Verwerk de ontvangen gegevens
        var livestreams = data.items.filter(livestream => livestream.snippet.title.toLowerCase().includes('plug'));
        livestreams.forEach(livestream => {
          var livestreamTitle = livestream.snippet.title;
          var livestreamThumbnail = livestream.snippet.thumbnails.high.url;
          var livestreamUrl = 'https://www.youtube.com/watch?v=' + livestream.id.videoId;
          console.log(livestreamTitle);

          // Genereer de code voor de livestream
          var livestreamCode = `<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 item" data-aos="fade" data-sub-html="<h4>${livestreamTitle}</h4>"><a href="${livestreamUrl}"><img src="${livestreamThumbnail}" alt="Image" class="img-fluid"></a><h4>${livestreamTitle}</h4></div>`;
          // Voeg de gegenereerde code toe aan de container
          container.innerHTML += livestreamCode;
        });
  
        // Controleer of er meer pagina's zijn en haal ze op
        if (data.nextPageToken) {
          fetchLivestreams(data.nextPageToken);
        }
      })
      .catch(error => {
        console.error('Er is een fout opgetreden:', error);
      });
  }
  
  // Roep de functie aan om de livestreams op te halen (beginnend bij de eerste pagina)
  fetchLivestreams();
  