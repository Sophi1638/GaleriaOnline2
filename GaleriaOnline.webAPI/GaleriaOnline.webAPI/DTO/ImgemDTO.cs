namespace GaleriaOnline.webAPI.DTO
{
    public class ImgemDTO
    {
        internal string Caminho;
        public IFormFile Arquivo { get; set; }
        public string Nome {get; set;}
    }
}
