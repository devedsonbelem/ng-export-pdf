import { Component, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Experience } from './model/experiencia';
import { Resume } from './model/resume';
import { ScriptService } from './service/script.service';
declare let pdfMake: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resume = new Resume();
  experiencia: Experience = new Experience();

  constructor(private scriptService: ScriptService) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experience) {
      this.resume.experience = new Experience();
    }
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          margin: [0, 0, 0, 20],
          table: {
            widths: '*',
            body: [
              [{
                border: [false, false, false, false],
                fillColor: '#3B8C2F',
                text: 'BANCO DA AMAZONIA',
                color: '#fff',
                bold: true,
                fontSize: 20,
                alignment: 'center',
              }]
            ]
          }

        },

        // PRIMEIRA LINHA
        {
          text: this.resume.name,
          style: 'name'
        },

        {
          columns: [
            // PRIMEIRA COLUNA
            [
              {
                text: 'Email: ' + this.resume.email,
                style: 'tamanho'
              },
              {
                text: 'GitHub: ' + this.resume.socialProfile,
                link: this.resume.socialProfile,
                style: 'tamanho'
                // color: 'blue',
              },
              {
                text: 'Empregador: ' + this.resume.experience.employer,
                style: 'tamanho'
              },
              {
                text: 'Experiencia : ' + this.resume.experience.experience + ' Meses',
                style: 'tamanho'
              }
            ],

            // SEGUNDA COLUNA
            [
              {
                text: 'Endereco: ' + this.resume.address,
                style: 'tamanho'
              },
              {
                text: 'Contrato No: ' + this.resume.contactNo,
                style: 'tamanho'
              },
              {
                text: 'Funcao: ' + this.resume.experience.jobTitle,
                style: 'tamanho'
               },
              {
                text: 'Descricao: ' + this.resume.experience.jobDescription,
                style: 'tamanho'
              },
            ],
          ]
        },

        // ULTIMA LINHA
        {
          text: 'Signature',
          style: 'sign'
        },
      ],



      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      tamanho:{
        fontSize: 14,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline',

        },
          name: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }


}
