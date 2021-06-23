using System.Linq;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace App.Conventions
{
    public class GroupingByNamespaceConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            var controllerNamespace = controller.ControllerType.Namespace;
            var apiVersion = controllerNamespace.Split(".").Last().ToLower();
            if (!apiVersion.StartsWith("V")) { apiVersion = "v1"; }
            {
                controller.ApiExplorer.GroupName = apiVersion;
            }
        }
    }
}