using GaleriaOnline.webAPI.Models;

namespace GaleriaOnline.webAPI.Interface
{
    public interface IImagemRepository
    {
        Task<IEnumerable<Imagem>> GetAllAsync();
        Task<Imagem?>GetByIdAsync(int id);
        Task<Imagem> CreateAsync(Imagem imagem);
        Task<bool> UpdateAsync(Imagem imagem);
        Task<bool> DeleteAsync(int id);

    }
}
