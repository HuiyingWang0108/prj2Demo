// Get references to page elements

// module.exports = function () {
var API = {
      savePostInfo: function (post) {
            return $.ajax({
                  headers: {
                        "Content-Type": "application/json"
                  },
                  type: "post",
                  url: "/api/createpostInfo",
                  data: JSON.stringify(post)
            }).then(function (dbPost) {
                  // if (err) throw err;
                  alert("---post--/api/createpostInfo-----" + dbPost);
            });
      },
      //postItem page
      getPostsByUsername: function (username) {
            return $.ajax({
                  url: "/api/createpostInfo/username/" + username,
                  type: "get"
            });
      },
      // Search By Zipcode page
      getPostsByZipcode: function (zipcode) {
            return $.ajax({
                  url: "/api/createpostInfo/zipcode/" + zipcode,
                  type: "get"
            });
      },
      //Search By title page
      getPostsByUseditem: function (title) {
            return $.ajax({
                  url: "/api/createpostInfo/title/" + title,
                  type: "get"
            });
      },
      // Delete a post by id
      deleteById: function (id) {
            return $.ajax({
                  url: "/api/createpostInfo/" + id,
                  type: "DELETE"
            });
      }
}
var refreshLocation = function () {
      API.getLocation().then(function (data) {
            alert.log("**888****", data);
            // $("#testId").text(data);
      });
};
var handleLocationFormSubmit = function (event) {
      event.preventDefault();
      // var location = {};
      var radioValue = $("input[name='locationNam']:checked").val();
      if (radioValue) {
            // alert("Your are a - " + radioValue);
            // location.location = radioValue;
            // localStorage.location = JSON.stringify(location);
            var locationVal = JSON.stringify(radioValue);
            // alert("locationVal:: " + locationVal);

            localStorage.setItem("locationVal", locationVal);
      } else {
            // alert("You must choice a location!");
            return;
      }

      // API.saveLocation(location).then(function () {
      //       // refreshLocation();
      //       console.log("----saveLocation--------");
      // });
      //Load createpostType page
      window.location.href = "/createpostType";
      // alert("window.location.href");

      // window.location.href = "/createpostType/?data" + location;
};
var handleTypeFormSubmit = function (event) {
      event.preventDefault();
      var radioTypeValue = $("input[name='typeNam']:checked").val();
      var radiocategoryValue = $("input[name='categoryNam']:checked").val();
      if (radioTypeValue) {
            // alert("Your are a - " + radioTypeValue+" + "+radiocategoryValue);
            // localStorage.location = JSON.stringify(location);
            var radioTypeVal = JSON.stringify(radioTypeValue);
            var radiocategoryVal = JSON.stringify(radiocategoryValue);
            localStorage.setItem("radioTypeValue", radioTypeVal);
            localStorage.setItem("radiocategoryValue", radiocategoryVal);
      } else {
            // alert("You must choice a location!");
            return;
      }
      //Load createpostType page
      window.location.href = "/createpostInfo";
};
var handlePostInfoFormSubmit = function (event) {
      event.preventDefault();
      var typeOfPost = $("#typeHeader").attr("value");
      var category = $("#categoryHeader").attr("value");
      var title = $("#postTitle").val().trim();
      // alert("title: "+title);
      var price = $("#postPrice").val().trim();
      var condition = $("option[name='conditionOpt']:selected").val();
      var img = $(".postImg").val();
      // alert("img: "+img);
      var userName = $(".username").text();
      // alert("userName: " + userName); if null 
      var contactNam = $("#contactNam").val().trim();
      var email = $("#email").val().trim();
      var phoneNum = $("#phoneNum").val().trim();
      var contactMedium = $("#contactMedium").val().trim();
      var language = $("option[name='laguageNam']:selected").val();
      var street = $("#street").val().trim();
      var location = $("#cityInput").val().trim();//city
      var state = $("#stateInput").val().trim();
      var zipcode = $("#zipcode").val().trim();
      // alert("condition: "+condition);


      var post = {
            title: title,
            street: street,
            city: location,
            state: state,
            postCode: zipcode,
            typeOfPost: typeOfPost,
            category: category,
            price: price,
            condition: condition,
            languageOfPost: language,
            email: email,
            phoneNum: phoneNum,
            contactName: contactNam,
            contactMedium: contactMedium,
            image: img,
            userName: userName
      };
      alert("post: " + JSON.stringify(post));
      if (!(post.title && post.street && post.city && post.state && post.postCode && post.phoneNum)) {
            alert("You must enter an necessory!");
            return;
      }

      API.savePostInfo(post).then(function () {
            // refreshExamples();
      });
      window.location.href = "/index";
      // alert("window.location.href = /index");
};
$(document).on("click", ".locationBtn", handleLocationFormSubmit);
$(document).on("click", ".typeBtn", handleTypeFormSubmit);
$(document).on("click", "#submitPost", handlePostInfoFormSubmit);
/**
 * Load the information if the user has posted and login
 */
function choiceFOrUser() {
      // alert("ok");
      /**
       * check the user has posted information
       * if the user posted a lot item, then the page will fill the latest address and contact information
       */
      var username = $(".username").text();
      //not login
      if (!username) {
            return;
      }

      API.getPostsByUsername(username).then(function (dbposts) {
            var n = dbposts.length;
            var selectedLocationVal = dbposts[n - 1].city;
            var selectedTypeVal = dbposts[n - 1].typeOfPost;
            var selectedCategoryVal = dbposts[n - 1].category;
            var contactNam = dbposts[n - 1].contactName;
            var email = dbposts[n - 1].email;
            var phoneNum = dbposts[n - 1].phoneNum;
            var contactMedium = dbposts[n - 1].contactMedium;
            var street = dbposts[n - 1].street;
            var cityInput = dbposts[n - 1].city;
            var stateInput = dbposts[n - 1].state;
            var zipcode = dbposts[n - 1].postCode;

            //login: The sys will auto selected the location in createpost page
            $("input[name='locationNam']").each(function () {
                  if ($(this).val() === selectedLocationVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            // alert(JSON.stringify(dbposts[n-1]));
            //login: The sys will auto selected the tye and category in createpostType page
            $("input[name='typeNam']").each(function () {
                  if ($(this).val() === selectedTypeVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            $("input[name='categoryNam']").each(function () {
                  if ($(this).val() === selectedCategoryVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            //login: The sys will auto selected the contact Info and Location Info in createpostInfo page
            $("#contactNam").attr("value", contactNam);
            $("#email").attr("value", email);
            $("#phoneNum").attr("value", phoneNum);
            $("#contactMedium").attr("value", contactMedium);
            $("#street").attr("value", street);
            $("#cityInput").attr("value", cityInput);
            $("#stateInput").attr("value", stateInput);
            $("#zipcode").attr("value", zipcode);
      });


}
window.onload = choiceFOrUser;
// }
// The API object contains methods for each kind of request we'll make

