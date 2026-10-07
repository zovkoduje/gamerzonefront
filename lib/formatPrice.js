const formatter = new Intl.NumberFormat('hr-HR', {style: 'currency', currency: 'EUR'});

export default function formatPrice(amount) {
    return formatter.format(amount || 0);
}
