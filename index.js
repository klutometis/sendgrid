$(function() {
  $("img").hide();
  $("#user").typeWatch({
    callback: function(user) {
      $("ul").empty();
      $("img").show();
      fetch = function(page) {
        $.getJSON("https://api.github.com/users/" + user +
                  "/repos?page=" + page,
                  function (data) {
                    $("img").hide();
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

  $("form").click(function(event){
    event.preventDefault();
  })

  $("input[type=submit]").click(function(event) {
    event.preventDefault();

    var api_user = decodeURIComponent($(document).getUrlParam("api_user"));
    var api_key = decodeURIComponent($(document).getUrlParam("api_key"));
    var to = $("#email").val();
    var user = $("#user").val();
    var subject = "Github repos for " + user;
    var text = subject + ":\n\n";

    $("li").each(function(i, repo) {
      text += "  - " + $(this).text() + "\n";
    });

    text += "\n";

    $.post("email.scm",
           {to: to,
            subject: subject,
            text: text,
            from: "pcd@roxygen.org",
            api_user: api_user,
            api_key: api_key})
      .done(function(data, status, error) {
        alert("Email sent.");
      })
      .fail(function(data, status, error) {
        alert("Email not sent.");
      });
  });
});
