import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  apiUrl = 'https://rtifx4axd1.execute-api.us-east-1.amazonaws.com/telemetry';

  dados: any[] = [];
  ultimo: any = {};
  chart: any;

  async ngOnInit() {
    await this.carregarDados();

    setInterval(() => {
      this.carregarDados();
    }, 5000);
  }

  async carregarDados() {
    const resposta = await fetch(this.apiUrl);
    this.dados = await resposta.json();

    this.ultimo = this.dados[this.dados.length - 1] || {};

    setTimeout(() => this.criarGraficoTemperatura(), 100);
    setTimeout(() => this.criarGraficoAltura(), 100);
  }

  criarGraficoTemperatura() {
    const labels = this.dados.map((_, i) => i + 1);
    const temperaturas = this.dados.map(d => d.temperatura);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('grafico', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Temperatura',
            data: temperaturas
          }
        ]
      }
    });
  }
  criarGraficoAltura() {
    const labels = this.dados.map((_, i) => i + 1);
    const alturas = this.dados.map(d => d.altura);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('grafico', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Altura da água',
            data: alturas
          }
        ]
      }
    });
  }
}