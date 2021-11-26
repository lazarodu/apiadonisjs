/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world web 1' }
})

Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
Route.get("/projetos", "ProjetosController.index")
Route.get("/projetos/:id", "ProjetosController.show")
Route.get("/faqs", "FaqsController.index")
Route.get("/faqs/:id", "FaqsController.show")
Route.get("/curtir", "ProjetoCurtirsController.index")
Route.get("/curtir/:id", "ProjetoCurtirsController.show")
Route.group(() => {
  Route.resource("projetos", 'ProjetosController').apiOnly().except(['index', 'show'])
  Route.resource("faqs", "FaqsController").apiOnly().except(["index", "show"])
  Route.resource("curtir", "ProjetoCurtirsController").apiOnly().except(["index", "show"])
}).middleware('auth')
