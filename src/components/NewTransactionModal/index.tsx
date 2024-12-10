import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <form action="">
                    <input type="text" placeholder='Descrição' required/>
                    <input type="number" placeholder='Preço' required/>
                    <input type="text" placeholder='Categporia' required/>

                    <TransactionType>
                        <TransactionTypeButton value='income' variant='income'>
                            <ArrowCircleUp size={24} color="#33cc95" />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton value='outcome' variant='outcome'>
                            <ArrowCircleDown size={24} color="#e52e4d" />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type='submit'>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>

    )
}