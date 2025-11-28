import FormField from '@/components/form-field';
import SelectFields from '@/components/select-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropsResponse, SelectOption, WireColor, WireType } from '@/types';
import { LoaderCircle } from 'lucide-react';

type FormFieldsProps = 'wire_code' | 'wire_type_id' | 'cross_section' | 'description' | 'base_color_id' | 'stripe_color_id';

interface WireData {
    wire_code: string;
    cross_section: string;
    description: string;
    wire_type_id: string;
    base_color_id: string;
    stripe_color_id: string;
}
export default function WireForm({
    submit,
    handleInputChange,
    handleSelectChange,
    data,
    getErrorForField,
    wire_colors,
    processing,
    reset,
    setClientErrors,
    wire_types,
    buttonName,
}: {
    submit: (e: React.FormEvent) => void;
    handleInputChange: (field: FormFieldsProps) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: FormFieldsProps) => (value: string) => void;
    data: WireData;
    getErrorForField: (field: FormFieldsProps) => string | undefined;
    wire_colors: WireColor[];
    processing: boolean;
    setClientErrors: (errors: any) => void;
    reset: () => void;
    wire_types: PropsResponse<WireType>;
    buttonName: string;
}) {
    const wire_types_options: SelectOption[] = wire_types.data.map((wire_type: WireType) => ({
        value: wire_type.id.toString(),
        label: wire_type.type_name,
    }));

    return (
        <>
            <form className="space-y-2" onSubmit={submit}>
                <div className="flex w-full space-x-2">
                    <FormField
                        label="Код провода (YPN)"
                        name="wire_code"
                        id="wire_code"
                        value={data.wire_code}
                        onChange={handleInputChange('wire_code')}
                        error={getErrorForField('wire_code')}
                        requiredIs
                        className={getErrorForField('wire_code') ? 'w-full border-red-500' : 'w-full'}
                    />
                    <div className="w-full">
                        <SelectFields
                            className={getErrorForField('base_color_id') ? 'border-red-500' : ''}
                            label="Тип провода"
                            message="Выберите тип провода"
                            options={wire_types_options}
                            onChange={handleSelectChange('wire_type_id')}
                            value={data.wire_type_id}
                            required
                            error={getErrorForField('wire_type_id')}
                        />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <FormField
                        label="Сечение"
                        name="cross_section"
                        id="cross_section"
                        value={data.cross_section}
                        onChange={handleInputChange('cross_section')}
                        requiredIs
                        error={getErrorForField('cross_section')}
                        placeholder="Например: 1.5 или 2,5"
                        className={getErrorForField('cross_section') ? 'w-full border-red-500' : 'w-full'}
                    />
                    <FormField
                        label="Описание"
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={handleInputChange('description')}
                        error={getErrorForField('description')}
                        placeholder="Необязательное описание"
                        className="w-full"
                    />
                </div>
                <div className="flex space-x-2">
                    <div className="w-full">
                        <Label className="required">
                            Основной цвет <span className="text-red-500">*</span>
                        </Label>
                        <div className="mt-1">
                            <Select value={data.base_color_id} onValueChange={handleSelectChange('base_color_id')}>
                                <SelectTrigger className={getErrorForField('base_color_id') ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Выберите основной цвет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_colors.map((wire_color: WireColor) => (
                                        <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                            <span
                                                className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300"
                                                style={{ backgroundColor: wire_color.color_code }}
                                            />
                                            <span>{wire_color.color_name}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {getErrorForField('base_color_id') && <p className="mt-1 text-sm text-red-500">{getErrorForField('base_color_id')}</p>}
                        </div>
                    </div>
                    <div className="w-full">
                        <Label className="">Дополнительный цвет</Label>
                        <div className="mt-1">
                            <Select value={data.stripe_color_id} onValueChange={handleSelectChange('stripe_color_id')}>
                                <SelectTrigger className={getErrorForField('stripe_color_id') ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Выберите дополнительный цвет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_colors.map((wire_color: WireColor) => (
                                        <SelectItem key={wire_color.id} value={wire_color.id.toString()}>
                                            <span
                                                className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300"
                                                style={{ backgroundColor: wire_color.color_code }}
                                            />
                                            <span>{wire_color.color_name}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {getErrorForField('stripe_color_id') && (
                                <p className="mt-1 text-sm text-red-500">{getErrorForField('stripe_color_id')}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2 pt-2">
                    <Button type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {buttonName}
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            reset();
                            setClientErrors({});
                        }}
                        disabled={processing}
                    >
                        Очистить
                    </Button>
                </div>
            </form>
            <div className="mt-6 text-sm text-muted-foreground">
                <span className="text-red-500">*</span> - Обязательные поля для заполнения
            </div>
        </>
    );
}
