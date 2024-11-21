let formulario = document.getElementById('formulario'), codigo = document.getElementById('codigoPHP'), JavaScript_Salida = document.getElementById('JavaScript_Salida');
const convertidor = (codigoPHP) => {
    let codigoJS = codigoPHP;
    codigoJS = codigoJS.replace(/\$(\w+)/g, 'let $1');
    codigoJS = codigoJS.replace(/console\.log\(let\s+(\w+)/g, 'console.log($1');
    codigoJS = codigoJS.replace(/if\s*\(isset\((.*?)\)\)/g, 'if ($1 !== undefined)');
    codigoJS = codigoJS.replace(/switch\s*\(let\s+(.*?)\)/g, 'switch ($1)');
    codigoJS = codigoJS.replace(/require_once\s+(.*?);/g, '// Requiere $1');
    codigoJS = codigoJS.replace(/echo\s+(.*);/g, 'console.log($1);');
    codigoJS = codigoJS.replace(/<\?php|<\?|(\?>)/g, '');
    return codigoJS;
}
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const codigoPHP = codigo.value;
    codigoPHP.trim() === ''? alert('Por favor, escribe algún código PHP.') : false ;
    const codigoJS = convertidor(codigoPHP);
    JavaScript_Salida.textContent = codigoJS;
});
document.getElementById('limpiar').addEventListener('click', () => {
    codigo.value = '';
    JavaScript_Salida.textContent = '';
});
document.getElementById('copiar').addEventListener('click', () => {
    const codigoJS = JavaScript_Salida.textContent;
    if (codigoJS.trim() === '') {
        alert('No hay código generado para copiar.');
        return;
    }
    navigator.clipboard.writeText(codigoJS)
        .then(() => alert('Código JavaScript copiado al portapapeles.'))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
});