using System;
using Moq;
using Contracts;
using Logger;

namespace Tests.Helpers
{
  public class MockAPI : IDisposable
    {
        public Mock<IRepositoryWrapper> repo;
        public Mock<ITokenService> tokenService;
        public Mock<ILoggerManager> logger;


        public MockAPI()
        {
            repo = new Mock<IRepositoryWrapper>();
            tokenService = new Mock<ITokenService>();
            logger = new Mock<ILoggerManager>();
        }
        
        public void Dispose()
        {
            repo = null;
            tokenService = null;
            logger = null;
            GC.SuppressFinalize(this);
        }

    }
}