var valoresAntigosIb = [];
var valoresAntigosVce = [];
var valoresAntigosIc = [];

        // Função para calcular as grandezas
        function calculate() {
            // Obter os valores atuais
            var Vbb = parseFloat(document.getElementById("Vbb").value);
            var Rb = parseFloat(document.getElementById("Rb").value);
            var Vcc = parseFloat(document.getElementById("Vcc").value);
            var Rc = parseFloat(document.getElementById("Rc").value);
            var Ganho = parseFloat(document.getElementById("Ganho").value);
            var Aprox = document.getElementById("aprox").value;

            // Calcular Ib
            var Ib;
            if (Aprox === 'primeira') {
                Ib = (Vbb / Rb) * (10 ** 6);
            } else {
                Ib = ((Vbb - 0.7) / Rb) * (10 ** 6);
            }

            // Adicionar o valor atual de Ib ao array de valores antigos
            valoresAntigosIb.push(Ib);
            console.log('Ib:', Ib); // Adiciona um log de console para verificar o valor de Ib

            // Calcular Ic e Vce
            var Ic = (Ib * Ganho) * (10 ** -3);
            var Ie = (Ib*(10 ** -3)) + Ic;
            var Vce = Vcc - (Rc * (Ic * (10 ** -3)));
            var Pd = Vce * Ic;

            // Adicionar os valores atuais aos arrays de valores antigos
            valoresAntigosVce.push(Vce);
            valoresAntigosIc.push(Ic);
            console.log('Ic:', Ic); // Adiciona um log de console para verificar o valor de Ic
            console.log('Vce:', Vce); // Adiciona um log de console para verificar o valor de Vce

            // Atualizar os campos de texto com os valores calculados
            document.getElementById("text_area_Ib").innerText = Ib.toFixed(2)
            document.getElementById("text_area_Ic").innerText = Ic.toFixed(2)
            document.getElementById("text_area_Ie").innerText=Ie.toFixed(2)
            document.getElementById("text_area_Vce").innerText = Vce.toFixed(2)
            document.getElementById("text_area_Pd").innerText=Pd.toFixed(2)
        }


        // Função para plotar o gráfico
        function plotGraph() {
            // Obtém o contexto do canvas onde o gráfico será desenhado
            var ctx = document.getElementById('grafico').getContext('2d');

            // Cria um novo gráfico de linha
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Variação do Ponto Q',
                        data: valoresAntigosIc.map(function(Ic, index) {
                            return { x: valoresAntigosVce[index], y: Ic };
                        }),
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                labelString: 'Tensão Coletor-Emissor (Vce)'
                            }
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                labelString: 'Corrente do Coletor (Ic)'
                            }
                        }
                    }
                }
            });
        }

        