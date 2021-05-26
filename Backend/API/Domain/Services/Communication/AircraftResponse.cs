using API.Domain.Models;

namespace API.Domain.Services.Communication
{
    public class AircraftResponse : BaseResponse
    {
        public Aircraft Aircraft { get; private set; }
        
        private AircraftResponse(bool success, string message, Aircraft aircraft) 
            : base(success, message)
        {
            Aircraft = aircraft;
        }

        /// <summary>
        /// Creates a success response
        /// </summary>
        /// <param name="aircraft">Saved aircraft.</param>
        /// <returns>Response.</returns>
        public AircraftResponse(Aircraft aircraft)
            : this(true, string.Empty, aircraft) { }
        
        /// <summary>
        /// Creates an error response
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public AircraftResponse(string message) 
            : this(false, message, null) { }
    }
}