import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, FacebookAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

import { Usuarios } from '../usuarios.model';
import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(
    private angularFirestore : AngularFirestore,
    private auth: Auth,
    private fireAuth : AngularFireAuth, 
    private router  : Router
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

  forgotPassword(email : string){
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      console.log(err);
    })
  }




  register({email, password }: any){
    return createUserWithEmailAndPassword(this.auth , email , password);
  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  forgot({ email }: any) {
    return sendPasswordResetEmail(this.auth ,email);
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
