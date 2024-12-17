import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo} from "react";


const seachFormSchema = z.object({
    query: z.string(),
})

type SeachFormInputs = z.infer<typeof seachFormSchema>

function SearchFormComponent() {
    
    const fetchTransactions  = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { register,
         handleSubmit,
         formState: { isSubmitting }
         } = useForm<SeachFormInputs>({
        resolver: zodResolver(seachFormSchema)
    });

    async function handleSeachTransactions(data: SeachFormInputs) {
        await fetchTransactions(data.query)
    }

    return (
        <SeachFormContainer onSubmit={handleSubmit(handleSeachTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button disabled={isSubmitting} type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SeachFormContainer>
    )
}

export const SearchForm = memo(SearchFormComponent)