$(function () {
  // <!-- ハンバーガーメニュー -->
  var state = false;
  var scrollpos;
  $('.js-open').on('click', function () {
    $('.js-open').toggleClass('active');
    if (state == false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({ 'top': -scrollpos });
      state = true;
    } else {
      $('body').removeClass('fixed').css({ 'top': 0 });
    }
  });

  // <!-- ハンバーガーメニューページ内リンク -->
  $('.js-link').on('click', function () {
    $('.js-open').removeClass('active');
    $('body').removeClass('fixed').css({ 'top': 0 });
  });

  // <!-- スムーススクロール -->
  // #から始まるURLがクリックされた時
  $('a[href^="#"]').on('click', function () {
    // 移動速度を指定（ミリ秒）
    let speed = 500;
    // hrefで指定されたidを取得
    let id = $(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = $("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = $(target).offset().top - 50;
    // ターゲットの位置までspeedの速度で移動
    $("html, body").animate(
      {
        scrollTop: position
      },
      speed
    );
    return false;
  });

  // <!-- モーダルスクロール止める -->
  let scrollPosition;
  $(".js-modalOpen").on("click", function () {
    setTimeout(function () {
      scrollPosition = $(window).scrollTop();
      $('body').addClass('fixed').css({ 'top': -scrollPosition });
    }, 400);
  });
  $(".js-modalClose").on("click", function () {
    $('body').removeClass('fixed').css({ 'top': 0 });
    window.scrollTo(0, scrollPosition);
  });

  // <!-- サービスシステム開発モーダル -->
  $('.js-modalOpen').on('click', function () {
    const target = $(this).data('target');
    const modal = $('#' + target);
    $(modal).addClass('show_modal');
  });
  $('.js-modalClose').on('click', function () {
    $('.js-modal').removeClass('show_modal');
  });

  // <!-- Slider  -->
  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 3,
    slidesOffsetAfter: 260,
    spaceBetween: 60,
    // // レスポンシブブレーポイント（画面幅による設定）
    breakpoints: {
      // 画面幅が 640px 以上の場合（window width >= 640px）
      0: {
        slidesPerView: 1,
        slidesOffsetAfter: 0,
        spaceBetween: 5,
      },
      // 画面幅が 890px 以上の場合（window width >= 1070px）
      890: {
        slidesPerView: 1.5,
        slidesOffsetAfter: 250,
        spaceBetween: 40,
      },

      // 画面幅が 1070px 以上の場合（window width >= 1070px）
      1070: {
        slidesPerView: 2,
        slidesOffsetAfter: 510,
        spaceBetween: 40,
      },
      // 画面幅が 1290px 以上の場合（window width >= 1290px）
      1290: {
        slidesPerView: 2.5,
        spaceBetween: 45,
      },
      // 画面幅が 1550px 以上の場合（window width >= 1290px）
      1550: {
        slidesPerView: 3,
        slidesOffsetAfter: 0,
        spaceBetween: 45,
      }
    },
    // pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets', //ページネーションの種類
      clickable: true, //クリックに反応させる
    },
  });
  // <!-- cursor  -->
  let
    cursor = $(".cursor"),
    cWidth = 8, //カーソルの大きさ
    delay = 10, //数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, //マウスのX座標
    mouseY = 0, //マウスのY座標
    posX = 0, //フォロワーのX座標
    posY = 0; //フォロワーのX座標

  //カーソルの遅延アニメーション
  //ほんの少しだけ遅延させる 0.001秒
  TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / delay;
      posY += (mouseY - posY) / delay;

      TweenMax.set(cursor, {
        css: {
          left: mouseX - (cWidth / 2),
          top: mouseY - (cWidth / 2)
        }
      });
    }
  });

  //マウス座標を取得
  $(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  $(".js-cursor").on({
    "mouseenter": function () {
      cursor.addClass("is-active");
    },
    "mouseleave": function () {
      cursor.removeClass("is-active");
    }
  });

  // <!-- wow.js  -->
  new WOW().init();
});
