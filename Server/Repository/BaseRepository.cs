using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Data;
using Contracts;

namespace Repository
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected ApplicationDbContext DbContext { get; set; }

        public BaseRepository(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public IQueryable<T> FindAll()
        {
            return DbContext.Set<T>()
                .AsNoTracking();
        }

        public IQueryable<T> FindByCondition(
            Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>()
                .Where(expression)
                .AsNoTracking();
        }

        public void Create(T entity)
        {
            DbContext.Set<T>()
                .Add(entity);
        }

        public void Update(T entity)
        {
            DbContext.Set<T>()
                .Update(entity);
        }

        public void Delete(T entity)
        {
            DbContext.Set<T>()
                .Remove(entity);
        }
    }
}