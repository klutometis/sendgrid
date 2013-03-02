$(function() {
  $("#user").typeWatch({
    callback: function(user) {
      $("ul").empty();
      $("img").css("visibility", "visible");
      $("#status").text("");
      fetch = function(page) {
        $.getJSON("scm/github.scm?user=" + user + "&page=" + page)
          .done(function (data) {
            $.each(data, function(i, repo) {
              $("ul").append($("<li>")
                             .append($("<a>", {href: repo.html_url})
                                     .append(repo.name)));
            });
            if (data.length > 0) {
              fetch(page + 1);
            } else {
              $("img").css("visibility", "hidden");
            }})
          .fail(function(data, status, error) {
            console.log(data)
            console.log(status)
            console.log(error)
            $("#status").text("Github request failed.");
            $("img").css("visibility", "hidden");
          })
      };
      fetch(1);
    }});

  $("form").click(function(event){
    event.preventDefault();
  })

  $("input[type=submit]").click(function(event) {
    $("#status").text("");

    var to = $("#email").val();
    var user = $("#user").val();
    var subject = "Github repos for " + user;
    var text = subject + ":\n\n";

    $("li").each(function(i, repo) {
      text += "  - " + $(this).text() + "\n";
    });

    text += "\n";

    $.post("sendgrid.scm",
           {to: to,
            subject: subject,
            text: text,
            from: "pcd@roxygen.org"})
      .done(function(data, status, error) {
        $("#status").text("Email sent.");
      })
      .fail(function(data, status, error) {
        $("#status").text("Email not sent.");
      });
  });
});
