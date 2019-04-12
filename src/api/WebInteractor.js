

class Constant {
    /**
     * Base URL
     */
    //static BASE_URL = "https://crusaders.projectstatus.in/index.php?option=com_api&task=get_match_list";
    
    //static BASE_URL = "https://ds01.24livehost.com/crusadersconz/index.php?option=com_api&task=";
    static BASE_URL = "https://crusaders.co.nz/index.php?option=com_api&task=";
    

    static URL_login = Constant.BASE_URL + 'login';
    static URL_RegisterUser = Constant.BASE_URL + 'registration';
    static URL_forgot_password = Constant.BASE_URL + 'forgot_password';
    static URL_get_user_card = Constant.BASE_URL + 'get_user_card';
    static URL_get_user_team = Constant.BASE_URL + 'get_user_team';
    static URL_get_match_list = Constant.BASE_URL + 'get_match_list';
    static URL_get_player_list = Constant.BASE_URL + 'get_players_list';
    static URL_get_player_detail = Constant.BASE_URL + 'get_player_detail';
    static URL_post_player_vote = Constant.BASE_URL + 'post_player_vote';
    static URL_change_card_status = Constant.BASE_URL + 'change_card_status';
    static URL_get_user_favcard = Constant.BASE_URL + 'get_user_favcard';
    static URL_send_user_card = Constant.BASE_URL + 'send_user_card';
    static URL_edit_user_profile = Constant.BASE_URL + 'edit_user_profile';
    static URL_get_user_profile = Constant.BASE_URL + 'get_user_profile';
    static URL_get_card_count = Constant.BASE_URL + 'get_card_count';
    static URL_edit_complete_profile = Constant.BASE_URL + 'edit_complete_profile';
    static URL_logout = Constant.BASE_URL + 'logout';


    static URL_Update_Profile = Constant.BASE_URL + 'UpdateProfile';
    static URL_Suffering_List = Constant.BASE_URL + 'SufferingList';
    static URL_Add_Family_Member = Constant.BASE_URL + 'AddFamilyMember';
    static URL_Family_Member_List = Constant.BASE_URL + 'FamilyMemberList';
    static URL_Emergency_Member_List = Constant.BASE_URL + 'EmergencyMemberList';


}


var WebServices = {
  callWebService: function(url, body ,header) {
    
      console.log('url: '+url)

    var index  = url.indexOf('change_card_status');
    var strOut = url.substr(index);

    var index1  = url.indexOf('send_user_card');
    var sendUserCardstrOut = url.substr(index1);

    var index2  = url.indexOf('edit_user_profile');
    var editUserProfileStrOut = url.substr(index2);

    var index3  = url.indexOf('edit_complete_profile');
    var editCompleteProfileStrOut = url.substr(index3);

    var index4  = url.indexOf('post_player_vote');
    var postPlayerVoteStrOut = url.substr(index4);

    var index5  = url.indexOf('get_player_detail');
    var getPlayerDetailStrOut = url.substr(index5);

    if  (strOut == 'change_card_status' || sendUserCardstrOut == 'send_user_card' || editUserProfileStrOut == 'edit_user_profile' || editCompleteProfileStrOut == 'edit_complete_profile' || postPlayerVoteStrOut == "post_player_vote" || getPlayerDetailStrOut == "get_player_detail"){


                  return fetch(url, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'multipart/form-data',
                              'XAPIKEY': header,
                          },
                          body: body
                      })
                      .then(response => response.text()) // Convert to text instead of res.json()
                      .then((text) => {
                          return text;
                      })
                      .then(response => JSON.parse(response)) // Parse the text.
                      .then((jsonRes) => {
                          return jsonRes; //main output
                      });
    }else{

      return fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              body: body
          })
          .then(response => response.text()) // Convert to text instead of res.json()
          .then((text) => {
              return text;
          })
          .then(response => JSON.parse(response)) // Parse the text.
          .then((jsonRes) => {
              return jsonRes; //main output
          });
        }

  },


    callWebService_GET: function (url, body) {

        console.log("Web Url " + url + " body " + JSON.stringify(body));

        return fetch(url, { // Use your url here
            method: 'GET',
            headers: {
                'XAPIKEY': body.XAPIKEY,
            },
        })
            .then(response => response.text()) // Convert to text instead of res.json()
            .then((text) => {

                return text;
            })
            .then(response => JSON.parse(response)) // Parse the text.
            .then((jsonRes) => {

                return jsonRes;
            });
    }
}
module.exports = {
    Constant,
    WebServices
}
