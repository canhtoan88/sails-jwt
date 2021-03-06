# jsonwebtoken

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Wed Mar 25 2020 08:34:39 GMT+0700 (Indochina Time) using Sails v1.2.4.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

"# sails-jwt" 

## Workflow
### Routes --> config/policies -> api/policies/isAuthorized --> api/controller --> api/services --> api/utils
#
1. Khi gọi API, trước khi chuyển đến controller để xử lý, hệ thống sẽ check policies xem có policy nào được thiết lập ứng với route đó không:
+ Nếu không sẽ đi trực tiếp vào controllers
+ Nếu có, sẽ check client đã authenticated chưa, nếu chưa authenticated sẽ trả về lỗi, nếu đã authenticated sẽ chuyển đến controllers.
#
2. Method được gọi ở phần target sẽ được gọi để xử lý trong controller. Trong controllers, các services sẽ được gọi để xử lý và phản hồi cho client.
#
3. Trong services sẽ có gọi đến jwt để encrypt/decrypt token và trả về token/data.
