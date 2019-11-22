import React, { Component } from 'react';
import './Conversor.css';

export default class Conversor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }

        this.toConvert = this.toConvert.bind(this);
    }

    toConvert() {
        let convertTo = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${convertTo}&compact=ultra&apiKey=ff8b9a5f1aea48137b33`;

        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json[convertTo]);
                let quotation = json[convertTo];
                let moedaB_valor = (parseFloat(this.state.moedaA_valor * quotation)).toFixed(2);
                this.setState({ moedaB_valor })
            })
    }

    render() {
        return (
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={(event) => { this.setState({ moedaA_valor: event.target.value }) }}></input>
                <input type="button" value="Converter" onClick={this.toConvert}></input>
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        )
    }
}