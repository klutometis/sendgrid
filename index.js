$(function() {
  $("#user").typeWatch({
    callback: function(user) {
      $("ul").empty();
      fetch = function(page) {
        $.getJSON("https://api.github.com/users/" + user +
                  "/repos?page=" + page,
                  function (data) {
                    $.each(data, function(i, repo) {
                      $("ul").append($("<li>").append(repo.name));
                    });
                    if (data.length > 0) {
                      fetch(page + 1);
                    }
                  });
      };
      fetch(1);
    }});

  // $("form").click(function(event){
  //   event.preventDefault();
  // })

  $("input[type=submit]").click(function(event) {
    // event.preventDefault();

    var text = "";
    var api_user = decodeURIComponent($(document).getUrlParam("api_user"));
    var api_key = decodeURIComponent($(document).getUrlParam("api_key"));
    // var to = $("#email").val();
    var user = $("#user").val();
    $("li").each(function(i, repo) {
      text += $(this).text() + "\n";
    });
    $("#subject").val("Github repos for " + user)
    $("#text").val(text)
    $("#api_user").val(api_user)
    $("#api_key").val(api_key)
    $("#from").val("pcd@roxygen.org")

    // $.post("https://sendgrid.com/api/mail.send.json",
    //       {to: to,
    //        subject: "Github repos for " + user,
    //        text: "wassup",
    //        from: "pcd@roxygen.org",
    //        api_user: api_user,
    //        api_key: api_key})
    //   .done(function(data, status, error) {
    //     alert("done")
    //   })
    //   .fail(function(data, status, error) {
    //                                 console.log("fail")
    //                                 console.log(data)
    //                                 console.log(status)
    //                                 console.log(error)
    //                                 // console.log(data.statusCode(status))
    //                                 // console.log(data.state())
    //                                 // console.log(data.getResponseHeader()) 
    //     // alert("Sending failed for some reason: ")
    //                                 });

    console.log(text);
  });
});
