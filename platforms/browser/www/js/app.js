// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'com.amar.ismunandar', // App bundle ID
  name: 'Ismunandar', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [{
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: [{
      path: '/',
      url: './index.html',
    },
    {
      path : '/profile/',
      url: './pages/profile.html',
    },
    {
      path: '/about/',
      url: './pages/about.html',
    },
    {
      path: '/catalog/',
      componentUrl: './pages/catalog.html',
    },
    {
      path: '/product/:id/',
      componentUrl: './pages/product.html',
    },
    {
      path: '/settings/',
      url: './pages/settings.html',
    },
    // Page Loaders & Router
    {
      path: '/page-loader-template7/:user/:userId/:posts/:postId/',
      templateUrl: './pages/page-loader-template7.html',
    },
    {
      path: '/page-loader-component/:user/:userId/:posts/:postId/',
      componentUrl: './pages/page-loader-component.html',
    },
    {
      path: '/request-and-load/user/:userId/',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;

        // App instance
        var app = router.app;

        // Show Preloader
        app.preloader.show();

        // User ID from request
        var userId = routeTo.params.userId;

        // Simulate Ajax Request
        setTimeout(function () {
          // We got user data from request
          var user = {
            firstName: 'Vladimir',
            lastName: 'Kharlampidi',
            about: 'Hello, i am creator of Framework7! Hope you like it!',
            links: [{
                title: 'Framework7 Website',
                url: 'http://framework7.io',
              },
              {
                title: 'Framework7 Forum',
                url: 'http://forum.framework7.io',
              },
            ]
          };
          // Hide Preloader
          app.preloader.hide();

          // Resolve route to load page
          resolve({
            componentUrl: './pages/request-and-load.html',
          }, {
            context: {
              user: user,
            }
          });
        }, 1000);
      },
    },
    {
      path: '/summary/',
      url: './pages/summary.html',
      on: {
        pageBeforeIn: function (e, page) {
          // $$('.toolbar .tabbar-labels .toolbar-bottom-md').hide();
          // Show Preloader
          // app.preloader.show();
          var demoGauge = app.gauge.create({
            el: '.demo-gauge',
            type: 'circle',
            value: 0,
            size: 100,
            borderColor: 'rgb(76, 170, 146)',
            borderWidth: 10,
            valueText: '0%',
            valueFontSize: 12,
            valueTextColor: 'rgb(76, 170, 146)',

          });
          app.request.post('http://103.52.146.34/dashboard/webservice/ws_summary.php', {}, function (data) {
            // console.log(data)
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
              var value_persen = obj[i]['persen'] / 100;
              var persen = obj[i]['persen'];

              $$('#pagu_btl').append(addCommas(obj[i]['tot_ang_btl']))
              $$('#realisasi_btl').append(addCommas(obj[i]['tot_rel_btl']))
              $$('#total_realisasi').append(addCommas(obj[i]['total_realisasi']))
              $$('#pagu_bl').append(addCommas(obj[i]['tot_ang_bl']))
              $$('#realisasi_bl').append(addCommas(obj[i]['realisasi_bl']))
              $$('#ls').append(addCommas(obj[i]['ls']))
              $$('#persen').text(persen + "%")
              $$('.persen_chart').attr('data-value', value_persen)
              $$('.persen_chart').attr('data-value-text', persen)
              demoGauge.update({
                value: value_persen,
                valueText: persen + '%'
              });


            }
            // console.log($$('.persen_chart').attr('data-value'))

          });
        }

      }

    },
    {
      path: '/realisasi-opd/',
      url: './pages/realisasi-opd.html',
      on: {
        pageBeforeIn: function (e, page) {

          app.request.post('http://103.52.146.34/dashboard/webservice/ws_nama_opd.php', {}, function (data) {
            
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
              $$(".list > .disabled > .item-radio").remove("i");
              // $$('#first_nama_opd').removeClass("icon-radio")
              $$('.nama_opd').append(
                '<option class="preloader color-green" value="' + obj[i]['nama_unit'] + '" kd_urusan="' + obj[i]['kd_urusan'] + '" kd_bidang="' + obj[i]['kd_bidang'] + '" kd_unit="' + obj[i]['kd_unit'] +'" kd_sub="'+ obj[i]['kd_sub'] +'">' + obj[i]['nama_unit'] +'</option>'
              )

            }
            
            $$('.nama_opd').change(function(){
              app.sheet.close(data.sheet, data.animate);
              $$('select[name="nama_opd"]  option:checked').each(function(){
                  var kd_urusan = $$(this).attr("kd_urusan");
                  var kd_bidang =  $$(this).attr("kd_bidang");
                  var kd_unit = $$(this).attr("kd_unit"); 
                  var kd_sub = $$(this).attr("kd_sub");
                
                  // console.log(kd_urusan + "," + kd_bidang + "," + kd_unit + "," + kd_sub)
      
                // $('.swiper-slide').fadeOut(function () { $(this).next().fadeIn(); });
                app.preloader.show("multi");
                setTimeout(function () {
                  app.preloader.hide();
                  realisasi_opd(kd_urusan, kd_bidang, kd_unit, kd_sub);
                }, 1500);
                $$('.preloader-modal').css("background-color", "#CCE3DE")
                app.on("orientationchange", function () {
                  realisasi_opd(kd_urusan, kd_bidang, kd_unit, kd_sub);
                  if (screen.orientation.angle == "90"){
                    $$('.swiper-slide').css('height', '80%')
                  }
                  else if (screen.orientation.angle == "0") {
                    $$('.swiper-slide').css('height', '50%')
                  }
                });
              })
            })

            

          });

          var html = '';
          // $$('.demo-swiper').append(
          //   '<div class="swiper-wrapper" id="slide_opd"></div>'
          // )
          // for (var a = 1; a < 12; a++) {
          //  $$( '<div class="swiper-slide" id="curve_chart'+a+'"></div>').appendTo('#slide_opd')            
          // }

          // $$('.demo-swiper').append(
          //   '<div class="swiper-pagination"></div>'
          // )
          
            // realisasi_opd();
            // loadChart();
            // ajax_load();
              var swiper = app.swiper.create('.swiper-container', {
                speed: 400,
                loop: true,
                centeredSlides: true,
                // autoplay: {
                //   delay: 2500,
                //   disableOnInteraction: false,
                // },
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
             
              });
    
        },
        pageAfterIn: function (e, page) {
          
             
         }

      }

    },
    {
      path: '/realisasi-kabupaten/',
      url: './pages/realisasi-kabupaten.html',
      on: {
        pageBeforeIn: function (e, page) {
          app.request.post('http://103.52.146.34/dashboard/webservice/ws_nama_opd.php', {}, function (data) {
            if (screen.orientation.angle == "90") {
              $$('.chart-kabupaten').css('height', '80%')
              $$('.demo').css('flex-direction', 'row');
              $$('.demo').css('justify-content', 'space-around');
              $$('.demo').css('align-items', 'strecth');
              $$('.demo').css('margin-left', '2.5rem');
              $$('#pagu').css('justify-content', 'space-between')
              $$('#pagu').css('align-items', 'center');
            }
            else if (screen.orientation.angle == "0") {
              $$('.chart-kabupaten').css('height', '50%')
              $$('.demo').css('flex-direction', 'column');
              $$('.demo').css('justify-content', 'flex-start');
              $$('.demo').css('align-items', 'center');
              $$('.demo').css('margin-left', 'auto');
              $$('#pagu').css('justify-content', 'stretch')
              $$('#pagu').css('align-items', 'stretch');
            }

            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
              $$(".list > .disabled > .item-radio").remove("i");
              // $$('#first_nama_opd').removeClass("icon-radio")
              $$('.nama_opd').append(
                '<option class="preloader color-green" value="' + obj[i]['nama_unit'] + '" kd_urusan="' + obj[i]['kd_urusan'] + '" kd_bidang="' + obj[i]['kd_bidang'] + '" kd_unit="' + obj[i]['kd_unit'] + '" kd_sub="' + obj[i]['kd_sub'] + '">' + obj[i]['nama_unit'] + '</option>'
              )

            }

            $$('.nama_opd').change(function () {
              app.sheet.close(data.sheet, data.animate);
              $$('select[name="nama_opd"]  option:checked').each(function () {
                var kd_urusan = $$(this).attr("kd_urusan");
                var kd_bidang = $$(this).attr("kd_bidang");
                var kd_unit = $$(this).attr("kd_unit");
                var kd_sub = $$(this).attr("kd_sub");

                // console.log(kd_urusan + "," + kd_bidang + "," + kd_unit + "," + kd_sub)

                // $('.swiper-slide').fadeOut(function () { $(this).next().fadeIn(); });
                app.preloader.show("multi");
                setTimeout(function () {
                  app.preloader.hide();
                  realisasi_kabupaten(kd_urusan, kd_bidang, kd_unit, kd_sub);
                }, 1500);
                $$('.preloader-modal').css("background-color", "#CCE3DE")
                app.on("orientationchange", function () {
                  realisasi_kabupaten(kd_urusan, kd_bidang, kd_unit, kd_sub);
                  if (screen.orientation.angle == "90") {
                    $$('.chart-kabupaten').css('height', '80%')
                    $$('.demo').css('flex-direction', 'row');
                    $$('.demo').css('justify-content', 'space-around');
                    $$('.demo').css('align-items', 'strecth');
                    $$('.demo').css('margin-left', '2.5rem');
                    $$('#pagu').css('justify-content', 'space-between')
                    $$('#pagu').css('align-items', 'center');
                  }
                  else if (screen.orientation.angle == "0") {
                    $$('.chart-kabupaten').css('height', '50%')
                    $$('.demo').css('flex-direction', 'column');
                    $$('.demo').css('justify-content', 'flex-start');
                    $$('.demo').css('align-items', 'center');
                    $$('.demo').css('margin-left', 'auto');
                    $$('#pagu').css('justify-content', 'stretch')
                    $$('#pagu').css('align-items', 'stretch');
                  }

                });
              })
            })



          });

          var html = '';
          // $$('.demo-swiper').append(
          //   '<div class="swiper-wrapper" id="slide_opd"></div>'
          // )
          // for (var a = 1; a < 12; a++) {
          //  $$( '<div class="swiper-slide" id="curve_chart'+a+'"></div>').appendTo('#slide_opd')            
          // }

          // $$('.demo-swiper').append(
          //   '<div class="swiper-pagination"></div>'
          // )

          // realisasi_opd();
          // loadChart();
          // ajax_load();
          var swiper = app.swiper.create('.swiper-container', {
            speed: 400,
            loop: true,
            centeredSlides: true,
            // autoplay: {
            //   delay: 2500,
            //   disableOnInteraction: false,
            // },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

          });

        },
        pageAfterIn: function (e, page) {


        }

      }

    },

    // Default route (404 page). MUST BE THE LAST
    {
      path: '(.*)',
      url: './pages/404.html',
    },
  ],
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});


var settingsView = app.views.create('#view-settings', {
  url: '/profile/'
});

if (screen.orientation.angle == "90") {

  $$('.swiper-slide').css('height', '80%')

}
else if (screen.orientation.angle == "0"){
  $$('.swiper-slide').css('height', '50%')
}
$('.jqx-chart-legend-text:contains("www.jqwidgets.com")').text("");

function realisasi_opd(kd_urusan, kd_bidang, kd_unit, kd_sub){
    $$('#note').text("Note : Tap dan tahan chart untuk menampilkan keterangan bulan dan nominal ")
  app.request.post('http://103.52.146.34/dashboard/webservice/ws_realisasi_opd.php?kd_urusan=' + kd_urusan + '&kd_bidang=' + kd_bidang + '&kd_unit=' + kd_unit + '&kd_sub=' + kd_sub, {}, function (result) {
    var obj_realisasi_opd = JSON.parse(result);
    for (var x = 0; x < obj_realisasi_opd.length; x++) {
      // console.log(obj_realisasi_opd[x]["realisasi_bl_1"]);
      $$('#judul_opd').text("")
      $$('#judul_opd').text("Realisasi OPD " + obj_realisasi_opd[x]['nama_unit'])
      var data_pie = [
        { Month: 'Jan', Realisasi: obj_realisasi_opd[x]['realisasi_bl_1'] },
        { Month: 'Feb', Realisasi: obj_realisasi_opd[x]['realisasi_bl_2'] },
        { Month: 'Mar', Realisasi: obj_realisasi_opd[x]['realisasi_bl_3'] },
        { Month: 'Apr', Realisasi: obj_realisasi_opd[x]['realisasi_bl_4'] },
        { Month: 'May', Realisasi: obj_realisasi_opd[x]['realisasi_bl_5'] },
        { Month: 'Jun', Realisasi: obj_realisasi_opd[x]['realisasi_bl_6'] },
        { Month: 'Jul', Realisasi: obj_realisasi_opd[x]['realisasi_bl_7'] },
        { Month: 'Aug', Realisasi: obj_realisasi_opd[x]['realisasi_bl_8'] },
        { Month: 'Sep', Realisasi: obj_realisasi_opd[x]['realisasi_bl_9'] },
        { Month: 'Oct', Realisasi: obj_realisasi_opd[x]['realisasi_bl_10'] },
        { Month: 'Nov', Realisasi: obj_realisasi_opd[x]['realisasi_bl_11'] },
        { Month: 'Dec', Realisasi: obj_realisasi_opd[x]['realisasi_bl_12'] }
      ];
      var settings = {
        title: "",
        description: "",
        enableAnimations: false,
        showLegend: true,
        showBorderLine: false,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
        source: data_pie,
        colorScheme: 'scheme03',
        seriesGroups:
          [
            {
              type: 'pie',
              showLabels: true,
              enableSeriesToggle: false,
              series:
                [
                  {
                    dataField: 'Realisasi',
                    displayText: 'Month',
                    showLabels: true,
                    labelRadius: 160,
                    labelLinesEnabled: true,
                    labelLinesAngles: true,
                    labelsAutoRotate: false,
                    initialAngle: 0,
                    radius: 85,
                    minAngle: 0,
                    maxAngle: 180,
                    centerOffset: 0,
                    offsetY: 170,
                    formatFunction: function (value) {
                      if (isNaN(value))
                        return value;
                      return addCommas(value);
                    },
                  }
                ]
            }
          ]
      };
      $('#chart').jqxChart(settings);

      $('.jqx-chart-legend-text:contains("www.jqwidgets.com")').text("");
      
    }
  })
}

function realisasi_kabupaten(kd_urusan, kd_bidang, kd_unit, kd_sub) {
  app.request.post('http://103.52.146.34/dashboard/webservice/ws_realisasi_kabupaten.php?kd_urusan=' + kd_urusan + '&kd_bidang=' + kd_bidang + '&kd_unit=' + kd_unit + '&kd_sub=' + kd_sub, {}, function (result) {
    var obj_realisasi_opd = JSON.parse(result);
   
    $$('#judul').text("");
    $$('#pagu').children("p").text("");
    $$('#pagu').children("p").css("display" , "none");
    for (var x = 0; x < obj_realisasi_opd.length; x++) {
      // console.log(obj_realisasi_opd[x]["realisasi_bl_1"]);
      $$('#pagu').children("p").css("display", "block");
      $$('#judul').append(obj_realisasi_opd[x]['nama_unit'])
      $$('#pagu').html(
        "<p>Pagu Anggaran: Rp"+obj_realisasi_opd[x]["pagu"]+"</p>"+
        // "<p class='text-align-center align-self-center'>Realisasi :</p>" +
        "<p>Realisasi BL : Rp"+addCommas(obj_realisasi_opd[x]['bl'])+"</p>"+
        "<p>Realisasi BTL : Rp"+addCommas(obj_realisasi_opd[x]['btl'])+"</p>"
      );
      var data_pie = [
        { data: 'BL', Realisasi: obj_realisasi_opd[x]['persen_bl'] },
        { data: 'BTL', Realisasi: obj_realisasi_opd[x]['persen_btl'] },
    
      ];
      var settings = {
        title: "",
        description: "",
        enableAnimations: false,
        showLegend: true,
        showBorderLine: false,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
        source: data_pie,
        colorScheme: 'scheme03',
        seriesGroups:
          [
            {
              type: 'pie',
              showLabels: true,
              enableSeriesToggle: false,
              series:
                [
                  {
                    dataField: 'Realisasi',
                    displayText: 'data',
                    showLabels: true,
                    labelRadius: 170,
                    labelLinesEnabled: true,
                    labelLinesAngles: true,
                    labelsAutoRotate: false,
                    initialAngle: 15,
                    radius: 70,
                    // minAngle: 0,
                    // maxAngle: 180,
                    centerOffset: 0,
                    // offsetY: 170,
                    formatFunction: function (value) {
                      if (isNaN(value))
                        return value;
                      return value + "%";
                    },
                  }
                ]
            }
          ]
      };
      $('.chart-kabupaten').jqxChart(settings);

      $('.jqx-chart-legend-text:contains("www.jqwidgets.com")').text("");

    }
  })
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split(',');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
})
// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  // app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

// $$('.toolbar-inner').css("background", "#4caa92");
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

$$('.serapan-anggaran').on("click",function(){
  app.dialog.alert('Fitur ini dalam tahap pengembangan !' );
})