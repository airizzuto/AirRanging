using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Contracts;
using Entities.Data;

namespace Repository
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected RepositoryContext RepositoryContext { get; set; }

        public BaseRepository(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public IQueryable<T> FindAll()
        {
            return RepositoryContext.Set<T>()
                .AsNoTracking();
        }

        public IQueryable<T> FindByCondition(
            Expression<Func<T, bool>> expression)
        {
            return RepositoryContext.Set<T>()
                .Where(expression)
                .AsNoTracking();
        }

        public void Create(T entity)
        {
            RepositoryContext.Set<T>()
                .Add(entity);
        }

        public void Update(T entity)
        {
            RepositoryContext.Set<T>()
                .Update(entity);
        }

        public void Delete(T entity)
        {
            RepositoryContext.Set<T>()
                .Remove(entity);
        }
    }
}