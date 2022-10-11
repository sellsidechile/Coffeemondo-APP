import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, FacebookAuthProvider } from '@angular/fire/auth';

import { Usuarios } from '../usuarios.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(
    private angularFirestore : AngularFirestore,
    private auth: Auth
  ) { }

  getUsuarios(){
    return this.angularFirestore
      .collection("Usuarios")
      .snapshotChanges()
  }
  getUsuariobyid(id){
    return this.angularFirestore
      .collection("Usuarios")
      .doc(id)
      .valueChanges()
  }
  createUsuario(usuarios:Usuarios){
    return new Promise<any>((resolve, reject)=>{
      this.angularFirestore
        .collection("Usuarios")
        .add(usuarios)
        .then((response)=>{
          console.log(response)
        },
        (error)=>{
          reject(error)
        })
    })
  }
  updateUsuario(usuarios:Usuarios,id){
    return this.angularFirestore
    .collection("Usuarios")
    .doc(id)
    .update({
      Nombre: usuarios.Nombre,
      Apellido: usuarios.Apellido,
      Mail: usuarios.Mail,
      Usuario: usuarios.Usuario,
      Pass: usuarios.Pass
    });
  }
  deleteUsuario(usuarios){
    return this.angularFirestore
    .collection("Usuarios")
    .doc(usuarios.id)
    .delete();
  }




  register({email, password }: any){
    return createUserWithEmailAndPassword(this.auth , email , password);
  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  loginWithFacebook(){
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

}
