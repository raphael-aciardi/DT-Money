import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    const { register,
        handleSubmit,
        formState: { isSubmitting },
        control
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <form onSubmit={handleSubmit(handleCreateNewTransaction)} action="">
                    <input {...register('description')} type="text" placeholder='Descrição' required />
                    <input {...register('price', { valueAsNumber: true })} type="number" placeholder='Preço' required />
                    <input {...register('category')} type="text" placeholder='Categporia' required />

                    <Controller
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton value='income' variant='income'>
                                        <ArrowCircleUp size={24} color="#33cc95" />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton value='outcome' variant='outcome'>
                                        <ArrowCircleDown size={24} color="#e52e4d" />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>)
                        }}
                    />

                    <button disabled={isSubmitting} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>

    )
}