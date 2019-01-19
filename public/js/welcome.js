// Script to handle welcome contents
$('#wboard-start').on('click', function() {
      $('#wl_wrapper').addClass('hidden');
      $('#login_wrapper').removeClass('hidden');
      $('#login_form').removeClass('hidden');
    });

    $('#close_login_wrapper').on('click', function(e) {
      e.preventDefault();
      $('#login_wrapper').addClass('hidden');
      $('#login_form').addClass('hidden');
      $('#signup_form').addClass('hidden');
      $('#wl_wrapper').removeClass('hidden');
    });

    $('#open-signup').on('click', function(){
      $('#login_form').addClass('hidden');
      $('#signup_form').removeClass('hidden');
      $('#feedback_box').addClass('hidden');
    });

    $('#back-btn').on('click', function(e) {
      e.preventDefault();
      $('#signup_form').addClass('hidden');
      $('#login_form').removeClass('hidden');
      $('#feedback_box').addClass('hidden');
    });

    $("#login_form").on("submit", (e) => {
      e.preventDefault();

      let $fbox = $("#feedback_box");
      let $lbtn = $("#login_btn");

      let txt = $lbtn.val();
      $lbtn.val("Logging in...");
      $lbtn.attr("disabled", true);

      login(
        $("#li_uname").val(), $("#li_pass").val(),
        (sdata) => {
          $fbox.removeClass("hidden error"); $fbox.addClass("success");
          $fbox.html("Login successful. Redirecting to app...");

          $lbtn.val(txt);
          $lbtn.attr("disabled", false);
          window.location.href = "/app";
        },
        (edata) => {
          let obj = JSON.parse(edata);
          $fbox.removeClass("hidden success"); $fbox.addClass("error");
          $fbox.html("Login error: " + obj["message"]);

          $lbtn.val(txt);
          $lbtn.attr("disabled", false);
        }
        );
    });

    $("#signup_form").on("submit", (e) => {
      e.preventDefault();

      let $fbox = $("#feedback_box");
      let $sbtn = $("#signup_btn");

      let txt = $sbtn.val();
      $sbtn.val("Signing in...");
      $sbtn.attr("disabled", true);

      signup(
        $("#su_name").val(), $("#su_uname").val(),
        $("#su_email").val(), $("#su_pass").val(),
        (sdata) => {
          $fbox.removeClass("hidden error"); $fbox.addClass("success");
          $fbox.html("Signup successful. Redirecting to app...");

          $sbtn.val(txt);
          $sbtn.attr("disabled", false);
          window.location.href = "/app";
        },
        (edata) => {
          let obj = JSON.parse(edata);
          $fbox.removeClass("hidden success"); $fbox.addClass("error");
          $fbox.html("Signup error: " + obj["message"]);

          $sbtn.val(txt);
          $sbtn.attr("disabled", false);
        }
        );
    });

