const bookForm = document.querySelector(".book-form"); // permettra d'envoyer le formulaire dans le book-list
const bookList = document.querySelector(".book-list"); // permettra de supprimer des livres ajoutés
const container = document.querySelector(".container"); // pour affiche les messages d'alerte

class Book{
    constructor(titre, auteur, annee){
        this.titre = titre;
        this.auteur = auteur;
        this.annee = annee;
    }
    
    addBookToList(book){
        const row = document.createElement("tr"); // création d'un tableau qui va récupérer les infos du "book-form"
        row.innerHTML = `
                        <td>${book.titre}</td>
                        <td>${book.auteur}</td>
                        <td>${book.annee}</td>
                        <td><button class="delete">x</button></td>
                        `
        bookList.appendChild(row);
    }

    clearFields(){ //permet de vider le formulaire après un ajout
        document.getElementById("titre").value = "";
        document.getElementById("auteur").value = "";
        document.getElementById("annee").value = "";
    }

    showAlert(message, className){
        const alert = document.createElement("div");
        alert.className = `alert ${className}`;
        alert.appendChild(document.createTextNode(message))
        container.insertBefore(alert, bookForm);

        setTimeout(()=>{
            document.querySelector(".alert").remove();
        }, 2500)
    }
}

class Interface{
    deleteBook(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove()
        }
    }
}

bookForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const annee = document.getElementById("annee").value;

    const book = new Book(titre, auteur, annee);

    if (titre === "" || auteur === "" || annee === ""){
        book.showAlert("Remplissez tous les champs", "error");
    } else {
        book.addBookToList(book);
        book.clearFields();
        book.showAlert(`Le livre ${book.titre} a été ajouté`, "success");
    }
})

bookList.addEventListener("click", (e)=>{
    const ui = new Interface();
    ui.deleteBook(e.target);
})