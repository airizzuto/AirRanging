namespace Entities.Models.Pagination
{
    /// <summary>
    /// Base clase for pagination and sorting of model parameters when retrieving entities.
    /// </summary>
    public abstract class QueryStringParameters
    {
        const int maxPageSize = 100;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 50;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }

        public string OrderBy { get; set; }
    }
}