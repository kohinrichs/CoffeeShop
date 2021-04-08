using CoffeeShop.Models;
using System.Collections.Generic;

namespace CoffeeShop.Repositories
{
    public interface ICoffeeRepository
    {
        void AddCoffee(Coffee variety);
        void DeleteCoffee(int id);
        List<Coffee> GetAllCoffee();
        Coffee GetCoffeeById(int id);
        void UpdateCoffee(Coffee variety);
    }
}