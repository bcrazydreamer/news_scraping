const option_obj = {
  'Main_Feeds' : ['Top Stories','Most Recent Stories','India','World','Business','Sports','Entertainment'],
  'Cities'     :[ 'Mumbai',
                  'Delhi',
                  'Bangalore',
                  'Hyderabad',
                  'Chennai',
                  'Ahemdabad',
                  'Allahabad',
                  'Bhubaneswar',
                  'Coimbatore',
                  'Gurgaon',
                  'Guwahati',
                  'Hubli',
                  'Kanpur',
                  'Kolkata',
                  'Ludhiana',
                  'Mangalore',
                  'Mysore',
                  'Noida',
                  'Pune',
                  'Goa',
                  'Chandigarh',
                  'Lucknow',
                  'Patna',
                  'Jaipur',
                  'Nagpur',
                  'Rajkot',
                  'Ranchi',
                  'Surat',
                  'Vadodara',
                  'Varanasi',
                  'Thane',
                  'Thiruvananthapuram' ],
    'World'       : ['US','NRI','Chaina','South Asia']
}

function UpDateTimeInContainer(doc){
  var timeLive = setInterval(function(){
    var time = new Date();
    time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    $(doc).html(time);
  }, 1000);
}
